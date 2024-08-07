import type { Config } from "tailwindcss";

export default {
	content: ["./src/**/*.{html,js,svelte,ts}"],
	theme: {
		extend: {
			colors: {
				bungie: {
					blue: "#65daff",
				},
			},
			fontFamily: {
				sans: ["InterVariable", { fontFeatureSettings: "'calt'" }],
			},
		},
	},
} satisfies Config;
