import { Lucia } from "lucia";
import { OAuth2Client } from "oslo/oauth2";
import { dev } from "$app/environment";
import { BUNGIE_CLIENT_ID } from "$env/static/private";
import { adapter } from "$lib/server/database";

export interface Tokens {
	accessToken: string;
	accessExpiration: number;
	refreshToken: string;
	refreshExpiration: number;
	membershipId: string;
}

export interface BungieTokenResponse {
	access_token: string;
	token_type: "Bearer";
	expires_in: number;
	refresh_token: string;
	refresh_expires_in: number;
	membership_id: string;
}

const redirectBase = dev ? "https://localhost:5173" : "https://thefirstknife.vercel.app";

export const oauth = new OAuth2Client(
	BUNGIE_CLIENT_ID,
	"https://www.bungie.net/en/oauth/authorize",
	"https://www.bungie.net/platform/app/oauth/token/",
	{ redirectURI: `${redirectBase}/auth/callback` },
);

export const auth = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: !dev,
		},
	},
	getUserAttributes(attributes) {
		return attributes;
	},
});

declare module "lucia" {
	interface Register {
		Lucia: typeof auth;
		DatabaseUserAttributes: {
			memberId: string;
			bungieName: string;
			displayName: string;
		};
	}
}
