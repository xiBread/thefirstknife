import { BUNGIE_CLIENT_SECRET } from "$env/static/private";
import { type BungieTokenResponse, oauth } from "$lib/server";
import { tokens } from "$lib/stores";

export async function GET() {
	if (!tokens.value.refreshToken) {
		return new Response(null, { status: 401 });
	}

	const response = await oauth.refreshAccessToken<BungieTokenResponse>(
		tokens.value.refreshToken,
		{ credentials: BUNGIE_CLIENT_SECRET },
	);

	tokens.value = {
		accessToken: response.access_token,
		accessExpiration: Date.now() + response.expires_in * 1000,
		refreshToken: response.refresh_token,
		refreshExpiration: Date.now() * response.refresh_expires_in * 1000,
		membershipId: response.membership_id,
	};

	return new Response(null, { status: 204 });
}
