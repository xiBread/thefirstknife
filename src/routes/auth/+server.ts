import { oauth } from "$lib/server/auth";
import { redirect } from "@sveltejs/kit";
import { generateState } from "oslo/oauth2";

export async function GET(event) {
	const state = generateState();
	const url = await oauth.createAuthorizationURL({ state });

	event.cookies.set("oauth_state", state, {
		path: "/",
		secure: import.meta.env.PROD,
		httpOnly: true,
		maxAge: 600,
		sameSite: "lax",
	});

	redirect(302, url.toString());
}
