import { getProfile, DestinyComponentType } from "bungie-api-ts/destiny2";
import { http } from "$lib/server";
import { classItemHashes } from "./hashes";

export async function load({ locals, depends }) {
	depends("app:class-items");

	const token = locals.tokens?.accessToken;

	if (!token || !locals.membership) {
		return { obtained: null };
	}

	const { Response: profile } = await getProfile(http(token), {
		destinyMembershipId: locals.membership.membershipId,
		membershipType: locals.membership.membershipType,
		components: [
			DestinyComponentType.ProfileInventories,
			DestinyComponentType.CharacterInventories,
			DestinyComponentType.CharacterEquipment,
			DestinyComponentType.ItemSockets,
		],
	});

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

	return { obtained };
}
