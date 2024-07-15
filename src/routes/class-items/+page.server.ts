import {
	getProfile,
	getDestinyManifest,
	getDestinyManifestComponent,
	DestinyComponentType,
	type DestinyInventoryItemDefinition,
	type DestinyManifest,
} from "bungie-api-ts/destiny2";
import { redirect } from "@sveltejs/kit";
import { http, type RedisClient } from "$lib/server";
import { classItemHashes, perkHashes } from "./hashes";

let manifest: DestinyManifest | undefined;
let inventoryItems: Record<number, DestinyInventoryItemDefinition> | undefined;

export async function load({ locals }) {
	const token = locals.tokens?.accessToken;
	if (!token || !locals.membership) redirect(302, "/auth");

	const classItems: DestinyInventoryItemDefinition[] = [];
	const perks: Record<string, DestinyInventoryItemDefinition[][]> = {};

	const $http = http(token);

	const { Response: profile } = await getProfile($http, {
		destinyMembershipId: locals.membership.membershipId,
		membershipType: locals.membership.membershipType,
		components: [
			DestinyComponentType.ProfileInventories,
			DestinyComponentType.CharacterInventories,
			DestinyComponentType.CharacterEquipment,
			DestinyComponentType.ItemSockets,
		],
	});

	if (!manifest) {
		manifest = (await getDestinyManifest($http)).Response;
		inventoryItems = await getDestinyManifestComponent($http, {
			destinyManifest: manifest,
			tableName: "DestinyInventoryItemDefinition",
			language: "en",
		});
	}

	const allHashes = classItemHashes.concat(...new Set(Object.values(perkHashes).flat(2)));
	const cached = await checkCache(allHashes, locals.redis);

	const classItemLCache = new Map<number, DestinyInventoryItemDefinition>();
	const perkLCache = new Map<number, DestinyInventoryItemDefinition>();

	for (let i = 0; i < cached.length; i++) {
		const hash = allHashes[i];
		if (!cached[i]) continue;

		if (classItemHashes.includes(hash)) {
			classItemLCache.set(hash, cached[i]);
		} else {
			perkLCache.set(hash, cached[i]);
		}
	}

	for (const hash of classItemHashes) {
		if (classItemLCache.has(hash)) {
			classItems.push(classItemLCache.get(hash)!);
		} else if (inventoryItems) {
			const item = inventoryItems[hash];
			classItems.push(item);

			await locals.redis.json.set(`${item.hash}`, "$", JSON.stringify(item), { NX: true });
		}
	}

	for (const [parent, columns] of Object.entries(perkHashes)) {
		for (const hashes of columns) {
			const column: DestinyInventoryItemDefinition[] = [];

			for (const hash of hashes) {
				if (perkLCache.has(hash)) {
					column.push(perkLCache.get(hash)!);
				} else if (inventoryItems) {
					const perk = inventoryItems[hash];
					column.push(perk);

					await locals.redis.json.set(`${perk.hash}`, "$", JSON.stringify(perk), {
						NX: true,
					});
				}
			}

			(perks[parent] ??= []).push(column);
		}
	}

	const obtained = [
		...profile.profileInventory.data!.items,
		...Object.values(profile.characterInventories.data!).flatMap((i) => i.items),
		...Object.values(profile.characterEquipment.data!).flatMap((i) => i.items),
	]
		.filter((i) => classItemHashes.includes(i.itemHash))
		.reduce<Record<string, string[] | undefined>>((all, item) => {
			const { sockets } = profile.itemComponents.sockets.data![item.itemInstanceId!];

			(all[item.itemHash] ??= []).push(`${sockets[10].plugHash!}+${sockets[11].plugHash!}`);
			return all;
		}, {});

	return {
		obtained,
		classItems,
		perks,
	};
}

async function checkCache(hashes: number[], redis: RedisClient) {
	const pipeline = redis.multi();
	hashes.forEach((h) => pipeline.json.get(`${h}`, { path: "$" }));

	const results = await pipeline.execAsPipeline();
	return results.filter((r) => r != null).map((reply) => JSON.parse((reply as [string])[0]));
}
