<script>
	import "../app.css";

	import dayjs from "dayjs";
	import en from "dayjs/locale/en";
	import isBetween from "dayjs/plugin/isBetween";
	import { loadDefs } from "@d2api/manifest-web";

	import { page } from "$app/stores";
	import Header from "$lib/components/Header.svelte";
	import Spinner from "$lib/components/Spinner.svelte";

	dayjs.locale(en);
	dayjs.extend(isBetween);

	const { children } = $props();

	const { description, image, keywords = [], path, twitter = true, ...seo } = $page.data.seo;
	const title = `${seo.title} | The First Knife`;

	keywords.push("destiny 2", "toolkit", "the final shape", "the first knife");
</script>

<svelte:head>
	<title>{title}</title>

	<meta name="description" content={description} />
	<meta name="keywords" content={keywords.join(",")} />

	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="The First Knife" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content="https://thefirstknife.com{path}" />

	{#if image}
		<meta property="og:image" content={image} />
	{/if}

	{#if twitter}
		<meta name="twitter:card" content="summary_large_image" />
		<meta name="twitter:title" content={title} />
		<meta name="twitter:description" content={description} />
		<meta name="twitter:image" content={image} />
	{/if}
</svelte:head>

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
