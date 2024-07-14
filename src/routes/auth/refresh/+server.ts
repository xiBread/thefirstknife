import { json } from "@sveltejs/kit";
import { bungie, setAuthCookie } from "$lib/server/auth";

export async function GET({ locals, cookies }) {
	if (!locals.tokens?.refreshToken) {
		return new Response(null, { status: 401 });
	}

	const newTokens = await bungie.refreshAccessToken(locals.tokens.refreshToken);
	setAuthCookie(cookies, newTokens);

	return json(newTokens);
}
