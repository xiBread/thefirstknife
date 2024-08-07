import { auth } from "$lib/server/auth";
import { fail, redirect } from "@sveltejs/kit";

export function load() {
	return {
		seo: {
			title: "Home",
			description: "A Swiss Army knife for Destiny 2.",
			image: "/favicon.svg",
			path: "/",
			twitter: false,
		},
	};
}

export const actions = {
	async signOut(event) {
		if (!event.locals.session) {
			return fail(401);
		}

		await auth.invalidateSession(event.locals.session.id);
		const cookie = auth.createBlankSessionCookie();

		event.cookies.set(cookie.name, cookie.value, {
			path: ".",
			...cookie.attributes,
		});

		redirect(302, "/");
	},
};
