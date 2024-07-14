import { inlineSvg } from "@svelte-put/inline-svg/vite";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import mkcert from "vite-plugin-mkcert";

export default defineConfig({
	plugins: [
        mkcert(),
		inlineSvg(
			[
				{
					directories: "./static/icons",
					attributes: {
						class: "svg-icon",
					},
				},
			],
			{ typedef: "src/inline-svg.d.ts" },
		),
		sveltekit(),
	],
	server: {
		proxy: {},
	},
});
