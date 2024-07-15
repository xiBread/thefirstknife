declare global {
	namespace App {
		interface Locals {
			redis: import("./lib/server/redis").RedisClient;
			tokens: import("./lib/server/bungie").BungieTokens | null;
			user: import("lucia").User | null;
			session: import("lucia").Session | null;
			membership?: import("bungie-api-ts/groupv2").GroupUserInfoCard;
		}

		interface PageData {
			user: Locals["user"];
		}

		// interface Error {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
