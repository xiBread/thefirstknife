<script lang="ts">
	import Seo from "$lib/components/Seo.svelte";
	import * as Card from "$lib/components/ui/card";
	import tools from "$lib/tools.json";
</script>

<Seo
	title="The First Knife | Destiny 2 Toolkit"
	description="A Swiss Army knife for Destiny 2."
	url="https://thefirstknife.vercel.app"
	image="/logo.png"
	useTwitter={false}
/>

<div class="auto-grid grid gap-4 px-4 py-6 sm:px-6 lg:py-16">
	{#each Object.entries(tools) as [slug, tool]}
		<a class="group" href={slug}>
			<Card.Root class="relative flex aspect-square overflow-hidden">
				<img
					class="absolute inset-0 h-full object-cover transition-all duration-300 group-hover:scale-105"
					src="/img/{tool.img}"
					alt=""
				/>

				<div class="absolute size-full bg-gradient-to-t from-black to-transparent"></div>

				<Card.Header class="z-10 place-self-end">
					<Card.Title class="text-3xl text-white">{tool.title}</Card.Title>
					<Card.Description class="text-base">{tool.description}</Card.Description>
				</Card.Header>
			</Card.Root>
		</a>
	{/each}
</div>

<style>
	.auto-grid {
		grid-template-columns: repeat(auto-fill, minmax(min(350px, 100%), 1fr));
	}
</style>
