import { BUNGIE_API_KEY } from "$env/static/private";
import type { GeneralUser } from "bungie-api-ts/user";

interface RequestOptions {
	path: string;
	params?: Record<string, unknown>;
	body?: string;
}

class BungieApi {
	getBungieUser(id: string): Promise<GeneralUser> {
		return this.#get(`/User/GetBungieNetUserById/${id}`);
	}

	#get(path: string, params?: Record<string, unknown>) {
		return this.#request("GET", { path, params });
	}

	async #request(method: string, options: RequestOptions) {
		const url = new URL(`https://www.bungie.net/Platform/${options.path}`);

		if (options.params) {
			for (const [key, value] of Object.entries(options.params)) {
				url.searchParams.append(key, String(value));
			}
		}

		const response = await fetch(url, {
			method,
			body: options.body ? JSON.stringify(options.body) : null,
			headers: {
				"X-API-Key": BUNGIE_API_KEY,
			},
		});

		const data = await response.json();
		return data.Response;
	}
}

export const bungie = new BungieApi();
