import { Lucia } from "lucia";
import { Cookies } from "@sveltejs/kit";
import { dev } from "$app/environment";
import { Bungie, type BungieTokens } from "./bungie";
import { adapter } from "./database";

export const bungie = new Bungie();

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

export function setAuthCookie(cookies: Cookies, tokens: BungieTokens) {
	cookies.set("bungie_auth", JSON.stringify(tokens), {
		path: "/",
		secure: import.meta.env.PROD,
		httpOnly: true,
		maxAge: Date.now() - tokens.accessExpiration.valueOf(),
		sameSite: "lax",
	});
}

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
