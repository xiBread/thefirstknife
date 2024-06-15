<script lang="ts">
	import RotateCw from "lucide-svelte/icons/rotate-cw";
	import { Button } from "$lib/components/ui/button";
	import * as Select from "$lib/components/ui/select";
	import Seo from "$lib/components/Seo.svelte";
	import tools from "$lib/tools.json";
	import wishes from "./wishes";

	let selected: { value: number } | undefined;

	$: wish = wishes[selected?.value ?? -1];
</script>

<Seo
	title="{tools['wall-of-wishes'].title} | The First Knife"
	description={tools["wall-of-wishes"].description}
	url="https://thefirstknife.vercel.app/wall-of-wishes"
	image={tools["wall-of-wishes"].img}
/>

<div class="flex flex-col items-center justify-center py-4">
	<div class="flex items-center gap-x-2">
		<Select.Root bind:selected onSelectedChange={(item) => (selected = item)}>
			<Select.Trigger class="w-[300px]">
				<Select.Value placeholder="Select a wish" />
			</Select.Trigger>

			<Select.Content class="[font-feature-settings:'tnum']">
				{#each wishes as wish, i}
					<Select.Item value={i}>{i + 1}. {wish.description}</Select.Item>
				{/each}
			</Select.Content>
		</Select.Root>

		<Button size="icon" variant="outline" on:click={() => (selected = { value: -1 })}>
			<RotateCw class="size-5" />
		</Button>
	</div>

	<div class="mb-6 mt-10 grid grid-cols-5 grid-rows-4 gap-4 sm:gap-6">
		{#each wish?.pattern ?? { length: 5 } as row}
			{#each row ?? { length: 4 } as symbol}
				<div class="size-16 rounded-full bg-muted sm:size-24">
					{#if symbol}
						<img
							src={symbol}
							alt="Symbol for the wall of wishes"
							width="96"
							height="96"
						/>
					{/if}
				</div>
			{/each}
		{/each}
	</div>

	{#if wish}
		<p>{wish.flavorText}</p>
	{/if}
</div>
