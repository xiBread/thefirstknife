import { auth, getMembership } from "$lib/server";
import { tokens } from "$lib/stores";

export async function handle({ event, resolve }) {
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

	const expiryDate = tokens.value.accessExpiration;

	if (expiryDate && expiryDate < Date.now()) {
		await event.fetch("/auth/refresh");
	}

	if (tokens.value.accessToken) {
		event.locals.membership ??= await getMembership(tokens.value.accessToken);
	}

	event.locals.user = user;
	event.locals.session = session;

	return resolve(event);
}
