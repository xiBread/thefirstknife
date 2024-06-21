<script lang="ts">
	import { persisted } from "svelte-persisted-store";
	import { Button } from "$lib/components/ui/button";
	import { Checkbox } from "$lib/components/ui/checkbox";
	import * as Table from "$lib/components/ui/table";
	import * as ToggleGroup from "$lib/components/ui/toggle-group";
	import Seo from "$lib/components/Seo.svelte";
	import { subtitle } from "$lib/stores";
	import tools from "$lib/tools.json";
	import classItems from "./data.json";

	subtitle.set("Class Items");

	let selected: string;
	$: perks = selected ? classItems[selected as keyof typeof classItems] : null;

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

<div class="flex flex-col items-center gap-y-10 py-12">
	<ToggleGroup.Root class="flex items-center gap-x-12" bind:value={selected}>
		{#each Object.keys(classItems) as name}
			<figure class="flex flex-col items-center">
				<ToggleGroup.Item class="size-24 p-2" value={name}>
					<img
						class="rounded-sm"
						src="/img/class-items/{name}.jpg"
						alt={name}
						width="96"
						height="96"
					/>
				</ToggleGroup.Item>

				<figcaption class="mt-0.5 text-sm capitalize">{name}</figcaption>
			</figure>
		{/each}
	</ToggleGroup.Root>

	{#if perks}
		<Table.Root>
			<Table.Header>
				<Table.Row>
					<Table.Head class="w-28 text-right">
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
									checked={$obtained[selected].includes(`${col1}+${col2}`)}
									onCheckedChange={(value) => updateList(!!value, col1, col2)}
								/>
							</Table.Cell>
						{/each}
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>

		<Button on:click={() => ($obtained[selected] = [])}>Reset</Button>
	{:else}
		<p class="absolute top-1/2 translate-y-1/2 font-medium">
			Select a class item above to get started.
		</p>
	{/if}
</div>
