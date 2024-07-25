<script lang="ts" context="module">
	import { persisted } from "svelte-persisted-store";

	export const settings = persisted("verity_settings", {
		labels: true,
		verify: true,
		autoScroll: true,
	});
</script>

<script lang="ts">
	import CheckCheck from "lucide-svelte/icons/check-check";
	import UserRound from "lucide-svelte/icons/user-round";
	import UsersRound from "lucide-svelte/icons/users-round";
	import { inlineSvg } from "@svelte-put/inline-svg";

	import { Button } from "$lib/components/ui/button";
	import { Separator } from "$lib/components/ui/separator";
	import * as ToggleGroup from "$lib/components/ui/toggle-group";
	import Shortcuts from "$lib/components/Shortcuts.svelte";

	import Sidebar from "./Sidebar.svelte";
	import { reverseMappings, isDisabled, solve, type Room } from "./util";

	const emptyState = ["", "", ""];

	// dev only
	// const devState1 = ["circle", "square", "triangle"];
	// const devState2 = ["sphere", "prism", "prism"];

	let steps = $state<HTMLElement>();
	let groups = $state<ReturnType<typeof solve>>([]);

	const rooms = $state<Room[]>([
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
	]);

	$effect(() => {
		const filled = rooms.flatMap((room) => room.selected).filter(Boolean);
		groups = filled.length === 6 ? solve(rooms[0].selected, rooms[1].selected) : [];

		if (filled.length === 6 && $settings.autoScroll) {
			steps?.scrollIntoView({ behavior: "smooth" });
		}
	});

	function filterGroup(group: (typeof groups)[number]) {
		const entries = Object.entries(group);

		return ($settings.verify ? entries : entries.filter(([type]) => type !== "verify")).map(
			([, step]) => step,
		);
	}

	function reset() {
		rooms[0].selected = [...emptyState];
		rooms[1].selected = [...emptyState];
	}
</script>

<div id="verity" class="relative h-full">
	<Sidebar />

	<div class="px-8 pb-28 md:ml-[var(--sidebar-width)] md:pt-1">
		<div class="space-y-12">
			{#each rooms as room}
				<div class="group grid grid-cols-3 gap-x-4" data-room={room.name}>
					<div class="col-span-full mb-6 flex w-full items-start text-white/60">
						<svelte:component
							this={room.name === "Inside" ? UserRound : UsersRound}
							class="mt-0.5 size-5 stroke-[1.5]"
						/>

						<div class="ml-2 w-full">
							<p class="font-light uppercase tracking-[0.15em]">{room.name}</p>

							<Separator />
						</div>
					</div>

					{#each ["Left", "Middle", "Right"] as side, i}
						<div class="flex flex-col items-center gap-y-2">
							<ToggleGroup.Root
								class="grid grid-cols-1 gap-1.5 group-data-[room='Outside']:grid-cols-2 lg:!grid-cols-3"
								onValueChange={(value) => {
									room.selected[i] = !value ? "" : `${value}`;
								}}
								bind:value={room.selected[i]}
							>
								{#each room.shapes as shape}
									<div class="flex flex-col items-center">
										<ToggleGroup.Item
											class="interactable button size-14"
											value={shape}
											disabled={isDisabled(room, shape, i)}
										>
											<svg
												class="size-10"
												use:inlineSvg={`/icons/shapes/${shape}.svg`}
											/>
										</ToggleGroup.Item>
									</div>
								{/each}
							</ToggleGroup.Root>

							<p class=" text-xs uppercase tracking-wide text-white/60">
								{side}
							</p>
						</div>
					{/each}
				</div>
			{/each}

			<div>
				{#if groups.length}
					<div class="mb-6 flex w-full items-start text-white/60">
						<CheckCheck class="mt-0.5 size-5 stroke-[1.5]" />

						<div class="ml-2 w-full">
							<p class="font-light uppercase tracking-[0.15em]">Solution</p>
							<Separator />
						</div>
					</div>

					<div
						class="relative grid grid-cols-3 items-center justify-center gap-2"
						bind:this={steps}
					>
						{#each groups as group}
							{@const isVerify = "verify" in group}

							{#each filterGroup(group) as steps}
								{#each steps as step}
									<div class="relative flex justify-center">
										{#if step.value}
											<Button
												class="pointer-events-none size-14 p-0 {isVerify &&
													'text-sky-400'}"
												disabled
											>
												<svg
													class="size-10"
													use:inlineSvg={`/icons/shapes/${reverseMappings[step.value]}.svg`}
												/>
											</Button>
										{:else}
											<img class="size-10" src="/img/missing.png" alt="" />
										{/if}
									</div>
								{/each}
							{/each}
						{/each}
					</div>
				{/if}
			</div>
		</div>
	</div>

	<Shortcuts
		shortcuts={{
			f: {
				symbol: "",
				label: "Reset",
				action: reset,
			},
		}}
	/>
</div>

<style>
	#verity {
		--sidebar-width: theme("spacing.96");
	}
</style>
