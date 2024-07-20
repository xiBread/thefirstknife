<script lang="ts">
	import type { DestinyInventoryItemLiteDefinition } from "bungie-api-ts/destiny2";
	import { getSandboxPerkDef } from "@d2api/manifest-web";

	interface Props {
		name: string;
		type: string;
		perks: DestinyInventoryItemLiteDefinition[];
	}

	const { name, type, perks }: Props = $props();
</script>

<div class="flex w-[400px] flex-col backdrop-blur-[1px]">
	<div class="bg-[#f7d53c]/75 p-2.5 pb-1.5">
		<p class="text-2xl/none font-medium uppercase tracking-wide">{name}</p>
		<p class="text-sm font-light text-white/60">{type}</p>
	</div>

	<div class="flex flex-col gap-y-1.5 bg-neutral-800/75 p-2.5">
		{#each perks as perk}
			<div class="flex gap-x-2 font-light">
				<img
					class="size-8"
					src="https://bungie.net{perk.displayProperties.icon}"
					alt={perk.displayProperties.name}
				/>

				<div>
					<p class="text-yellow-300">
						{perk.displayProperties.name}
					</p>

					<p class="text-sm text-white/60">
						{getSandboxPerkDef(perk.perks[0].perkHash)?.displayProperties.description}
					</p>
				</div>
			</div>
		{/each}
	</div>
</div>
