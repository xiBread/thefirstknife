import { auth } from "$lib/server/auth";

export async function handle({ event, resolve }) {
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
			path: ".",
			...cookie.attributes,
		});
	}

	event.locals.user = user;
	event.locals.session = session;

	return resolve(event);
}
