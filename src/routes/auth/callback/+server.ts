import { getBungieNetUserById } from "bungie-api-ts/user";
import { eq } from "drizzle-orm";
import { generateIdFromEntropySize } from "lucia";
import { OAuth2RequestError } from "oslo/oauth2";
import { BUNGIE_CLIENT_SECRET } from "$env/static/private";
import { auth, type BungieTokenResponse, oauth, http } from "$lib/server";
import { db, users } from "$lib/server/database";
import { tokens } from "$lib/stores";

export async function GET(event) {
	const code = event.url.searchParams.get("code");
	const state = event.url.searchParams.get("state");
	const storedState = event.cookies.get("oauth_state") ?? null;

	if (!code || !state || !storedState || state !== storedState) {
		return new Response(null, { status: 400 });
	}

	try {
		const tokenResponse = await oauth.validateAuthorizationCode<BungieTokenResponse>(code, {
			credentials: BUNGIE_CLIENT_SECRET,
		});

		tokens.value = {
			accessToken: tokenResponse.access_token,
			accessExpiration: Date.now() + tokenResponse.expires_in * 1000,
			refreshToken: tokenResponse.refresh_token,
			refreshExpiration: Date.now() + tokenResponse.refresh_expires_in * 1000,
			membershipId: tokenResponse.membership_id,
		};

		const { Response: user } = await getBungieNetUserById(http(tokenResponse.access_token), {
			id: tokenResponse.membership_id,
		});

		const [existingUser] = await db
			.select({ id: users.id })
			.from(users)
			.where(eq(users.memberId, user.membershipId));

		if (existingUser) {
			const session = await auth.createSession(existingUser.id, {});
			const cookie = auth.createSessionCookie(session.id);

			event.cookies.set(cookie.name, cookie.value, {
				path: "/",
				...cookie.attributes,
			});
		} else {
			const userId = generateIdFromEntropySize(10);

			await db.insert(users).values({
				id: userId,
				memberId: user.membershipId,
				bungieName: user.uniqueName,
				displayName: user.displayName,
			});

			const session = await auth.createSession(userId, {});
			const cookie = auth.createSessionCookie(session.id);

			event.cookies.set(cookie.name, cookie.value, {
				path: "/",
				...cookie.attributes,
			});
		}
	} catch (error) {
		console.error(error);
		return new Response(null, { status: error instanceof OAuth2RequestError ? 400 : 500 });
	}

	return new Response(null, {
		status: 302,
		headers: {
			Location: "/",
		},
	});
}
