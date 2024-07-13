import { getMembershipDataForCurrentUser } from "bungie-api-ts/user";
import { http } from "./http";

export async function getMembership(token: string) {
	const { Response: membership } = await getMembershipDataForCurrentUser(http(token));

	const memberships = membership.destinyMemberships.filter(
		(m) => m.crossSaveOverride === 0 || m.crossSaveOverride === m.membershipType,
	);

	// if (memberships.length === 1) {
	return memberships[0];
	// }

	// TODO: handle multiple accounts
}
