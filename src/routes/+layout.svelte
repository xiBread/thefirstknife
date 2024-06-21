<script>
	import "../app.css";
	import dayjs from "dayjs";
	import en from "dayjs/locale/en";
	import isBetween from "dayjs/plugin/isBetween";
	import { ModeWatcher } from "mode-watcher";
	import Header from "$lib/components/Header.svelte";

	dayjs.locale(en);
	dayjs.extend(isBetween);
</script>

<ModeWatcher defaultMode="dark" />

<Header />

<main class="mx-auto max-w-7xl px-6">
	<slot />
</main>
