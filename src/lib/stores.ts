import { persisted } from "svelte-persisted-store";

export const veritySettings = persisted("verity_settings", {
	verify: true,
	labels: true,
});
