import { inlineSvg } from "@svelte-put/inline-svg/vite";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [
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
});
