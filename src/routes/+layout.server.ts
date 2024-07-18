import { setApiKey } from "@d2api/manifest-web";
import { BUNGIE_API_KEY } from "$env/static/private";

setApiKey(BUNGIE_API_KEY);

export function load({ locals }) {
	return { user: locals.user };
}
