import { persisted } from "svelte-persisted-store";

export const veritySettings = persisted("verity_settings", {
	labels: true,
	verify: true,
	autoScroll: true,
});
