import { json } from "@sveltejs/kit";
import { BUNGIE_CLIENT_SECRET } from "$env/static/private";
import { type BungieTokenResponse, oauth, setAuthCookie } from "$lib/server/auth";

export async function GET({ locals, cookies }) {
	if (!locals.tokens?.refreshToken) {
		return new Response(null, { status: 401 });
	}

	const response = await oauth.refreshAccessToken<BungieTokenResponse>(
		locals.tokens.refreshToken,
		{ credentials: BUNGIE_CLIENT_SECRET },
	);

	const tokens = setAuthCookie(cookies, response);
	return json(tokens);
}