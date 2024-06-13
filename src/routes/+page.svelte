<script lang="ts">
	import * as Card from "$lib/components/ui/card";
	import tools from "$lib/tools.json";
</script>

<svelte:head>
	<title>The First Knife | Destiny 2 Tools</title>
</svelte:head>

<div class="auto-grid grid gap-6">
	{#each tools as tool}
		<a class="group" href={tool.slug}>
			<Card.Root class="relative flex aspect-square overflow-hidden">
				<img
					class="absolute inset-0 h-full object-cover grayscale transition-all duration-300 group-hover:scale-105 group-hover:filter-none"
					src="/img/{tool.img}"
					alt=""
				/>

				<div class="absolute size-full bg-gradient-to-t from-black to-transparent"></div>

				<Card.Header class="z-10 place-self-end">
					<Card.Title class="text-4xl text-white">{tool.title}</Card.Title>
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
