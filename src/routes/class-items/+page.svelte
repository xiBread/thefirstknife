<script lang="ts">
	import type { DestinyInventoryItemLiteDefinition } from "bungie-api-ts/destiny2";
	import Check from "lucide-svelte/icons/check";
	import CheckCheck from "lucide-svelte/icons/check-check";
	import X from "lucide-svelte/icons/x";
	import { onMount } from "svelte";
	import { getInventoryItemLiteDef } from "@d2api/manifest-web";

	import { goto, invalidate } from "$app/navigation";
	import * as Table from "$lib/components/ui/table";
	import * as ToggleGroup from "$lib/components/ui/toggle-group";
	import { Tooltip } from "$lib/components/ui/tooltip";
	import Perk from "$lib/components/Perk.svelte";
	import Shortcuts from "$lib/components/Shortcuts.svelte";

	import { classItemHashes, perkHashes } from "./hashes";
	import Roll from "./Roll.svelte";

	type InventoryItem = DestinyInventoryItemLiteDefinition & { hash: number };

	const { data } = $props();

	let classItems = $state<InventoryItem[]>([]);
	let perks = $state<Record<string, InventoryItem[][]>>({});

	let selected = $state<string>("");
	const obtained = $derived(data.obtained[selected]);

	onMount(() => {
		classItems = classItemHashes.map(withHash);

		perks = Object.entries(perkHashes).reduce<Record<string, InventoryItem[][]>>(
			(all, [parent, columns]) => {
				all[parent] ??= [];

				columns.forEach((hashes, i) => {
					all[parent][i] = hashes.map(withHash);
				});

				return all;
			},
			{},
		);
	});

	function spiritOf(name: string) {
		return /Spirit of (?:the )?([-\w ]+)/.exec(name)![1];
	}

	function hasRoll(roll: string) {
		return {
			obtained: obtained?.some((r) => r === roll) ?? false,
			duplicate: (obtained?.filter((r) => r === roll).length ?? 0) > 1,
		};
	}

	function withHash(hash: number) {
		return { ...getInventoryItemLiteDef(hash)!, hash };
	}
</script>

<div class="flex flex-col items-center gap-y-10 px-6 py-12 md:px-10">
	<ToggleGroup.Root class="flex items-center gap-x-12" bind:value={selected}>
		{#each classItems as classItem}
			{@const { name } = classItem.displayProperties}

			<figure class="flex flex-col items-center">
				<ToggleGroup.Item class="size-20" value={`${classItem.hash}`}>
					<div class="class-item relative aspect-square before:z-[1]">
						<img
							src="https://bungie.net{classItem.displayProperties.icon}"
							alt={name}
							width="96"
							height="96"
						/>

						<img
							class="absolute left-0 top-0"
							src="https://bungie.net{classItem.iconWatermark}"
							alt=""
						/>

						<img
							class="masterwork absolute left-0 top-0 z-[2] opacity-0 transition-opacity duration-300"
							src="/img/masterwork.png"
							alt=""
						/>

						<div class="shine z-[3] opacity-0 transition-opacity duration-300"></div>
					</div>
				</ToggleGroup.Item>

				<figcaption class="mt-1.5 text-sm capitalize">
					{name}
				</figcaption>
			</figure>
		{/each}
	</ToggleGroup.Root>

	{#if selected}
		<Table.Root>
			<Table.Header>
				<Table.Row class="select-none">
					<Table.Head class="w-28 text-right text-white/60">
						{new Set(obtained).size} / 64
					</Table.Head>

					{#each perks[selected][1] as perk2}
						<Table.Head class="w-32 text-center font-normal text-foreground">
							{@render tooltip(perk2)}
						</Table.Head>
					{/each}
				</Table.Row>
			</Table.Header>

			<Table.Body>
				{#each perks[selected][0] as perk1}
					<Table.Row class="select-none">
						<Table.Cell class="text-right">
							{@render tooltip(perk1)}
						</Table.Cell>

						{#each perks[selected][1] as perk2}
							<Table.Cell class="[&_svg]:mx-auto [&_svg]:size-4">
								{@const roll = hasRoll(`${perk1.hash}+${perk2.hash}`)}
								{@const ci = classItems.find((i) => `${i.hash}` === selected)!}

								{#if roll.obtained}
									<Tooltip>
										{#snippet trigger()}
											<svelte:component
												this={roll.duplicate ? CheckCheck : Check}
												class="text-sky-400"
											/>
										{/snippet}

										{#snippet content()}
											<Roll
												name={ci.displayProperties.name}
												type={ci.itemTypeDisplayName}
												perks={[perk1, perk2]}
											/>
										{/snippet}
									</Tooltip>
								{:else}
									<X class="text-white/60" />
								{/if}
							</Table.Cell>
						{/each}
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	{:else}
		<p class="absolute top-1/2 translate-y-1/2 font-light">
			Select a class item above to get started.
		</p>
	{/if}
</div>

<Shortcuts
	shortcuts={{
		f: {
			symbol: "",
			label: "Refresh",
			action: () => invalidate("app:class-items"),
		},
		escape: {
			symbol: "",
			label: "Back to home",
			action: () => goto("/"),
		},
	}}
/>

{#snippet tooltip(perk: InventoryItem)}
	<Tooltip>
		{#snippet trigger()}
			{spiritOf(perk.displayProperties.name)}
		{/snippet}

		{#snippet content()}
			<Perk
				type="Intrinsic"
				name={perk.displayProperties.name}
				description={perk.displayProperties.description}
			/>
		{/snippet}
	</Tooltip>
{/snippet}

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
