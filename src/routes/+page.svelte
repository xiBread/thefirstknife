<script lang="ts">
	import tools from "$lib/tools.json";
</script>

<div class="auto-grid grid gap-2 px-4 pb-6 pt-2 sm:px-6">
	{#each Object.entries(tools) as [slug, tool]}
		<a href={slug}>
			<div class="interactable relative aspect-square justify-start bg-transparent">
				<img
					class="absolute inset-0 -z-[5] h-full object-cover transition-all duration-300"
					src={tool.image}
					alt=""
				/>

				<div
					class="absolute -z-[5] size-full bg-gradient-to-t from-black to-transparent"
				></div>

				<div class="z-10 flex flex-col space-y-1.5 place-self-end p-6">
					<h3 class="text-3xl/none font-medium">{tool.title}</h3>
					<p class="max-w-[22rem] text-base font-light text-white/60">
						{tool.description}
					</p>
				</div>
			</div>
		</a>
	{/each}
</div>

<style>
	.auto-grid {
		grid-template-columns: repeat(auto-fill, minmax(min(350px, 100%), 1fr));
	}
</style>
