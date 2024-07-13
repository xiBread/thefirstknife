import { getMembership } from "$lib/server";
import { auth, type Tokens } from "$lib/server/auth";

export async function handle({ event, resolve }) {
	const tokens = JSON.parse(event.cookies.get("bungie_auth") ?? "null") as Tokens | null;
	event.locals.tokens = tokens;

	if (event.url.pathname.includes("refresh")) {
		return resolve(event);
	}

	const sessionId = event.cookies.get(auth.sessionCookieName);

	if (!sessionId) {
		event.locals.user = null;
		event.locals.session = null;

		return resolve(event);
	}

	const { session, user } = await auth.validateSession(sessionId);

	const cookie = !session
		? auth.createBlankSessionCookie()
		: session.fresh
			? auth.createSessionCookie(sessionId)
			: null;

	if (cookie) {
		event.cookies.set(cookie.name, cookie.value, {
			path: "/",
			...cookie.attributes,
		});
	}

	if (tokens?.accessExpiration && tokens.accessExpiration < Date.now()) {
		const response = await event.fetch("/auth/refresh");
		const newTokens = await response.json();

		event.locals.tokens = newTokens;
	}

	if (event.locals.tokens?.accessToken) {
		event.locals.membership ??= await getMembership(event.locals.tokens.accessToken);
	}

	event.locals.user = user;
	event.locals.session = session;

	return resolve(event);
}
