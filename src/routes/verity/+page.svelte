<script lang="ts" context="module">
	type Shape = keyof typeof shapes;

	export interface Room {
		name: string;
		shapes: Shape[];
		selected: string[];
	}
</script>

<script lang="ts">
	import CircleSlash from "lucide-svelte/icons/circle-slash";
	import { Separator } from "$lib/components/ui/separator";
	import * as ToggleGroup from "$lib/components/ui/toggle-group";
	import * as shapes from "./shapes";
	import { reverseMappings, isDisabled, solve } from "./util";

	interface Step {
		value: string | null;
		side: number;
	}

	const rooms: Room[] = [
		{
			name: "Inside",
			shapes: ["circle", "square", "triangle"],
			selected: ["", "", ""],
		},
		{
			name: "Outside",
			shapes: ["sphere", "cube", "pyramid", "cylinder", "prism", "cone"],
			selected: ["", "", ""],
		},
	];

	let steps: Record<string, Step[]>[] = [];

	function reset() {
		for (const room of rooms) room.selected = ["", "", ""];
	}

	$: {
		const filled = rooms.flatMap((room) => room.selected).filter(Boolean);

		if (filled.length === 6) {
			steps = solve(rooms[0].selected, rooms[1].selected);
		} else {
			steps = [];
		}
	}

	// needed to bypass template typechecking
	const getSvg = (shape: string) => shapes[shape as Shape];
</script>

<svelte:head>
	<title>Verity | The First Knife</title>
</svelte:head>

<div class="flex flex-col">
	<div class="space-y-12">
		{#each rooms as room}
			<div class="grid grid-cols-3 gap-x-4">
				<h3 class="col-span-full mb-2 text-center text-4xl font-bold">{room.name}</h3>

				{#each ["Left", "Middle", "Right"] as side, i}
					<div class="flex flex-col items-center">
						<h4 class="mb-2 text-xl font-medium">{side}</h4>

						<ToggleGroup.Root
							class="grid grid-cols-3 gap-x-10 gap-y-4"
							size="lg"
							onValueChange={(value) => {
								room.selected[i] = !value ? "" : `${value}`;
							}}
						>
							{#each room.shapes as shape}
								<div class="flex flex-col items-center">
									<ToggleGroup.Item
										class="size-14"
										value={shape}
										disabled={isDisabled(room, shape, i)}
									>
										<div class="*:size-12">
											{@html shapes[shape]}
										</div>
									</ToggleGroup.Item>

									<span class="mt-1 capitalize">{shape}</span>
								</div>
							{/each}
						</ToggleGroup.Root>
					</div>
				{/each}
			</div>
		{/each}
	</div>

	{#if steps.length}
		<Separator class="my-10" />

		<div class="grid grid-cols-3 items-center justify-center gap-y-4">
			{#each steps as step}
				{#each Object.values(step) as dissections}
					{#each dissections as dissection}
						<div class="flex flex-col items-center">
							{#if dissection.value}
								{@const shape = reverseMappings[dissection.value]}

								<div class="p-2 *:size-12">
									{@html getSvg(shape)}
								</div>

								<span class="mt-1 capitalize">{shape}</span>
							{:else}
								<CircleSlash class="size-16 stroke-1 p-2 text-foreground/30" />
								<span class="mt-1 capitalize text-foreground/30">None</span>
							{/if}
						</div>
					{/each}
				{/each}
			{/each}
		</div>
	{/if}
</div>
