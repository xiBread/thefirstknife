import { BUNGIE_API_KEY } from "$env/static/private";
import type { HttpClientConfig } from "bungie-api-ts/http";

export function http(accessToken: string) {
	return async (config: HttpClientConfig) => {
		const url = new URL(config.url);

		for (const [key, value] of Object.entries(config.params ?? {})) {
			url.searchParams.append(key, value);
		}

		const response = await fetch(url.toString(), {
			headers: {
				"X-API-Key": BUNGIE_API_KEY,
				Authorization: `Bearer ${accessToken}`,
			},
		});

		return response.json();
	};
}
