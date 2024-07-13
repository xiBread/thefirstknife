import { DestinyComponentType, getProfile } from "bungie-api-ts/destiny2";
import { http } from "$lib/server";
import { tokens } from "$lib/stores";

export async function load({ locals }) {
	const token = tokens.value.accessToken;

	if (!token || !locals.membership) {
		return { simple: true };
	}

	const { Response: profile } = await getProfile(http(token), {
		destinyMembershipId: locals.membership.membershipId,
		membershipType: locals.membership.membershipType,
		components: [
			DestinyComponentType.CharacterInventories,
			DestinyComponentType.ProfileInventories,
		],
	});

	// TODO: data
}
