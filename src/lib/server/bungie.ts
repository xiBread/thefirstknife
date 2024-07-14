import { OAuth2Client } from "oslo/oauth2";
import { TimeSpan, createDate } from "oslo";
import { BUNGIE_CLIENT_ID, BUNGIE_CLIENT_SECRET, BUNGIE_REDIRECT_URL } from "$env/static/private";

export interface BungieTokens {
	accessToken: string;
	accessExpiration: Date;
	refreshToken: string;
	refreshExpiration: Date;
	membershipId: string;
}

interface BungieTokenResponse {
	access_token: string;
	expires_in: number;
	membership_id: string;
	refresh_token: string;
	refresh_expires_in: number;
}

export class Bungie {
	readonly #client: OAuth2Client;
	readonly #secret = BUNGIE_CLIENT_SECRET;

	public constructor() {
		this.#client = new OAuth2Client(
			BUNGIE_CLIENT_ID,
			"https://www.bungie.net/en/oauth/authorize",
			"https://www.bungie.net/platform/app/oauth/token/",
			{ redirectURI: BUNGIE_REDIRECT_URL },
		);
	}

	public async createAuthorizationURL(state: string): Promise<URL> {
		return await this.#client.createAuthorizationURL({ state });
	}

	public async validateAuthorizationCode(code: string): Promise<BungieTokens> {
		const response = await this.#client.validateAuthorizationCode<BungieTokenResponse>(code, {
			credentials: this.#secret,
		});

		return {
			accessToken: response.access_token,
			accessExpiration: createDate(new TimeSpan(response.expires_in, "s")),
			refreshToken: response.refresh_token,
			refreshExpiration: createDate(new TimeSpan(response.refresh_expires_in, "s")),
			membershipId: response.membership_id,
		};
	}

	public async refreshAccessToken(refreshToken: string): Promise<BungieTokens> {
		const response = await this.#client.refreshAccessToken<BungieTokenResponse>(refreshToken, {
			credentials: this.#secret,
		});

		return {
			accessToken: response.access_token,
			accessExpiration: createDate(new TimeSpan(response.expires_in, "s")),
			refreshToken: response.refresh_token,
			refreshExpiration: createDate(new TimeSpan(response.refresh_expires_in, "s")),
			membershipId: response.membership_id,
		};
	}
}
