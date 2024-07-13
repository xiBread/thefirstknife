import { DestinyComponentType, getProfile } from "bungie-api-ts/destiny2";
import { getMembership, http } from "$lib/server";
import { tokens } from "$lib/stores";

export async function load() {
	const token = tokens.value.accessToken;
	if (!token) return { simple: true };

	const membership = await getMembership(token);
	if (!membership) return { simple: true };

	const { Response: profile } = await getProfile(http(token), {
		destinyMembershipId: membership.membershipId,
		membershipType: membership.membershipType,
		components: [
			DestinyComponentType.CharacterInventories,
			DestinyComponentType.ProfileInventories,
		],
	});

	// TODO: data
}
