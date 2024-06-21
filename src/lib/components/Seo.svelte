<script lang="ts">
	export let url: string;
	export let title: string;
	export let description: string;
	export let keywords: string[] = [];
	export let image: string | undefined;

	export let useTwitter = true;

	keywords.push("destiny 2", "toolkit", "the final shape");
</script>

<svelte:head>
	<title>{title}</title>

	<meta name="description" content={description} />

	{#if keywords.length}
		<meta name="keywords" content={keywords.join(",")} />
	{/if}

	<meta property="og:type" content="website" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={url} />

	{#if image}
		<meta property="og:image" content={image} />
	{/if}

	{#if useTwitter}
		<meta name="twitter:card" content="summary_large_image" />
		<meta name="twitter:title" content={title} />
		<meta name="twitter:description" content={description} />
		<meta name="twitter:image" content={image} />
	{/if}
</svelte:head>
