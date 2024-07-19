<script>
	import "../app.css";

	import dayjs from "dayjs";
	import en from "dayjs/locale/en";
	import isBetween from "dayjs/plugin/isBetween";
	import { loadDefs } from "@d2api/manifest-web";

	import Header from "$lib/components/Header.svelte";
	import Spinner from "$lib/components/Spinner.svelte";

	dayjs.locale(en);
	dayjs.extend(isBetween);

	const { children } = $props();
</script>

{#await loadDefs()}
	<div class="flex h-svh items-center justify-center">
		<Spinner message="Fetching manifest..." />
	</div>
{:then}
	<Header />

	<main class="min-h-svh">
		{@render children()}
	</main>
{/await}

<style>
	main {
		padding-top: calc(1rem + var(--header-height));
	}
</style>
