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
	import RotateCw from "lucide-svelte/icons/rotate-cw";
	import { Button } from "$lib/components/ui/button";
	import { Separator } from "$lib/components/ui/separator";
	import * as ToggleGroup from "$lib/components/ui/toggle-group";
	import * as Tooltip from "$lib/components/ui/tooltip";
	import { veritySettings } from "$lib/stores";
	import * as shapes from "./shapes";
	import { reverseMappings, isDisabled, solve } from "./util";
	import Guide from "./Guide.svelte";
	import Settings from "./Settings.svelte";

	interface Step {
		value: string | null;
		side: number;
	}

	const emptyState = ["", "", ""];

	const rooms: Room[] = [
		{
			name: "Inside",
			shapes: ["circle", "square", "triangle"],
			selected: [...emptyState],
		},
		{
			name: "Outside",
			shapes: ["sphere", "cube", "pyramid", "cylinder", "prism", "cone"],
			selected: [...emptyState],
		},
	];

	let groups: Record<string, Step[]>[] = [];

	$: {
		const filled = rooms.flatMap((room) => room.selected).filter(Boolean);
		groups = filled.length === 6 ? solve(rooms[0].selected, rooms[1].selected) : [];
	}

	// needed to bypass template typechecking
	const getSvg = (shape: string) => shapes[shape as Shape];

	function filterGroup(group: Record<string, Step[]>) {
		const entries = Object.entries(group);

		return (
			$veritySettings.verify ? entries : entries.filter(([type]) => type !== "verify")
		).map(([, step]) => step);
	}

	function reset() {
		rooms[0].selected = [...emptyState];
		rooms[1].selected = [...emptyState];
	}
</script>

<svelte:head>
	<title>Verity | The First Knife</title>
</svelte:head>

<div class="flex flex-col">
	<div class="space-y-12">
		{#each rooms as room, r}
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
							bind:value={rooms[r].selected[i]}
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

									{#if $veritySettings.labels}
										<span class="mt-1 capitalize">{shape}</span>
									{/if}
								</div>
							{/each}
						</ToggleGroup.Root>
					</div>
				{/each}
			</div>
		{/each}
	</div>

	{#if groups.length}
		<Separator class="my-10" />

		<div id="steps" class="grid grid-cols-3 items-center justify-center gap-y-4">
			{#each groups as group}
				{#each filterGroup(group) as steps}
					{#each steps as step}
						<div class="flex flex-col items-center">
							{#if step.value}
								{@const shape = reverseMappings[step.value]}

								<div class="p-2 *:size-12">
									{@html getSvg(shape)}
								</div>

								{#if $veritySettings.labels}
									<span class="mt-1 capitalize">{shape}</span>
								{/if}
							{:else}
								<CircleSlash class="size-16 stroke-1 p-2 text-foreground/30" />

								{#if $veritySettings.labels}
									<span class="mt-1 capitalize text-foreground/30">None</span>
								{/if}
							{/if}
						</div>
					{/each}
				{/each}
			{/each}
		</div>
	{/if}
</div>

<div class="fixed left-4 top-1/2 -translate-y-1/2 rounded-full">
	<div class="flex flex-col gap-y-2.5">
		<Guide />

		<Tooltip.Root openDelay={150}>
			<Tooltip.Trigger asChild let:builder>
				<Button
					class="rounded-full"
					size="icon"
					variant="secondary"
					builders={[builder]}
					on:click={reset}
				>
					<RotateCw class="size-5" />
				</Button>
			</Tooltip.Trigger>

			<Tooltip.Content side="left">
				<p class="font-medium">Guide</p>
			</Tooltip.Content>
		</Tooltip.Root>

		<Settings />
	</div>
</div>
