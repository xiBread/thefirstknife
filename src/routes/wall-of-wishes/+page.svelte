<script lang="ts">
	import RotateCw from "lucide-svelte/icons/rotate-cw";
	import { Button } from "$lib/components/ui/button";
	import * as Select from "$lib/components/ui/select";
	import Seo from "$lib/components/Seo.svelte";
	import tools from "$lib/tools.json";
	import wishes from "./wishes";

	let selected = $state<{ value: number }>();
	let wish = $derived(wishes[selected?.value ?? -1]);
</script>

<Seo
	title="{tools['wall-of-wishes'].title} | The First Knife"
	description={tools["wall-of-wishes"].description}
	keywords={[
		"forsaken",
		"last wish",
		"raid",
		"wish wall",
		"kali",
		"shuro chi",
		"morgeth",
		"vault",
		"riven",
	]}
	url="https://thefirstknife.vercel.app/wall-of-wishes"
	image={tools["wall-of-wishes"].img}
/>

<div class="flex flex-col items-center justify-center py-12">
	<div class="flex items-center gap-x-1.5">
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

		<Button size="square" onclick={() => (selected = { value: -1 })}>
			<RotateCw class="size-5" />
		</Button>
	</div>

	<div class="mb-6 mt-10 grid grid-cols-5 grid-rows-4 gap-4 sm:gap-6">
		{#each wish?.pattern ?? { length: 5 } as row}
			{#each row ?? { length: 4 } as symbol, i (`${symbol}-${i}`)}
				<div class="size-16 rounded-full bg-muted shadow-inner sm:size-24">
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
