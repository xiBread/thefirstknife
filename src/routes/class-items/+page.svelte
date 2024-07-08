<script lang="ts">
	import { persisted } from "svelte-persisted-store";
	import { Button } from "$lib/components/ui/button";
	import { Checkbox } from "$lib/components/ui/checkbox";
	import * as Table from "$lib/components/ui/table";
	import * as ToggleGroup from "$lib/components/ui/toggle-group";
	import Seo from "$lib/components/Seo.svelte";
	import tools from "$lib/tools.json";
	import classItems from "./data.json";

	let selected = $state<string>("");
	let perks = $state<string[][]>();

	$effect(() => {
		perks = selected ? classItems[selected as keyof typeof classItems] : undefined;
	});

	const obtained = persisted<Record<string, string[]>>("eci_checklist", {
		relativism: [],
		stoicism: [],
		solipsism: [],
	});

	function updateList(value: boolean, col1: string, col2: string) {
		if (!selected) return;

		const roll = `${col1}+${col2}`;

		if (!value) {
			$obtained[selected].splice($obtained[selected].indexOf(roll), 1);
		} else {
			$obtained[selected].push(roll);
		}

		$obtained[selected] = $obtained[selected];
	}
</script>

<Seo
	title="{tools['class-items'].title} | The First Knife"
	description={tools["class-items"].description}
	keywords={[
		"exotic",
		"class items",
		"dual destiny",
		"secret mission",
		"checklist",
		"perks",
		"combinations",
	]}
	url="https://thefirstknife.vercel.app/class-items"
	image="/img/{tools['class-items'].img}"
/>

<div class="flex flex-col items-center gap-y-10 px-6 py-12 md:px-10">
	<ToggleGroup.Root class="flex items-center gap-x-12" bind:value={selected}>
		{#each Object.keys(classItems) as name}
			<figure class="flex flex-col items-center">
				<ToggleGroup.Item class="size-20" value={name}>
					<div class="class-item relative aspect-square before:z-[1]">
						<img src="/img/class-items/{name}.jpg" alt={name} width="96" height="96" />

						<img class="absolute left-0 top-0" src="/img/watermark.png" alt="" />
						<img
							class="masterwork absolute left-0 top-0 z-[2] opacity-0 transition-opacity duration-300"
							src="/img/masterwork.png"
							alt=""
						/>

						<div class="shine z-[3] opacity-0 transition-opacity duration-300"></div>
					</div>
				</ToggleGroup.Item>

				<figcaption class="mt-1.5 text-sm capitalize">{name}</figcaption>
			</figure>
		{/each}
	</ToggleGroup.Root>

	{#if perks}
		<Table.Root>
			<Table.Header>
				<Table.Row>
					<Table.Head class="w-28 text-right text-white/60">
						{$obtained[selected].length} / 64
					</Table.Head>

					{#each perks[1] as col2}
						<Table.Head class="w-32 text-center font-normal text-foreground">
							{col2}
						</Table.Head>
					{/each}
				</Table.Row>
			</Table.Header>

			<Table.Body>
				{#each perks[0] as col1}
					<Table.Row>
						<Table.Cell class="text-right">{col1}</Table.Cell>

						{#each perks[1] as col2}
							<Table.Cell class="text-center">
								<Checkbox
									class="inline-flex"
									checked={$obtained[selected].includes(`${col1}+${col2}`)}
									onCheckedChange={(value) => updateList(!!value, col1, col2)}
								/>
							</Table.Cell>
						{/each}
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>

		<Button onclick={() => ($obtained[selected] = [])}>Reset</Button>
	{:else}
		<p class="absolute top-1/2 translate-y-1/2 font-medium">
			Select a class item above to get started.
		</p>
	{/if}
</div>

<style>
	.class-item::before {
		content: "";
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		box-shadow: inset 0 0 0 calc(3px * 0.75) hsl(0 0 100% / 70%);
	}

	:global([data-state="on"]) {
		.masterwork {
			opacity: 1;
		}

		.shine {
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			mask: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Cpath d='M2 2h44v44H2z'/%3E%3C/svg%3E"),
				linear-gradient(#fff, #fff);
			mask-composite: exclude;
			-webkit-mask-composite: destination-out;
			opacity: 1;

			&::after {
				content: "";
				animation: spin 6s linear infinite;
				position: absolute;
				inset: -100%;
				background: linear-gradient(180deg, #0000 30%, #fff 50%, #0000 70%);
			}
		}
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
			transform-origin: center center;
		}

		50% {
			transform: rotate(180deg);
		}

		100% {
			transform: rotate(360deg);
		}
	}
</style>
