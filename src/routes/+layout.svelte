<script>
	import "../app.css";
	import dayjs from "dayjs";
	import en from "dayjs/locale/en";
	import isBetween from "dayjs/plugin/isBetween";
	import Header from "$lib/components/Header.svelte";

	dayjs.locale(en);
	dayjs.extend(isBetween);

	const { children } = $props();
</script>

<Header />

<main class="min-h-svh">
	{@render children()}
</main>
