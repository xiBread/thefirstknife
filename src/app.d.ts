declare global {
	namespace App {
		interface Locals {
			user: import("lucia").User | null;
			session: import("lucia").Session | null;
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
