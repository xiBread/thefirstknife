<script lang="ts">
	import CheckCheck from "lucide-svelte/icons/check-check";
	import CircleSlash from "lucide-svelte/icons/circle-slash";
	import UserRound from "lucide-svelte/icons/user-round";
	import UsersRound from "lucide-svelte/icons/users-round";
	import { onMount } from "svelte";
	import { persisted } from "svelte-persisted-store";
	import { inlineSvg } from "@svelte-put/inline-svg";

	import { goto } from "$app/navigation";
	import { Checkbox } from "$lib/components/ui/checkbox";
	import { Label } from "$lib/components/ui/label";
	import { Link } from "$lib/components/ui/link";
	import { Separator } from "$lib/components/ui/separator";
	import * as ToggleGroup from "$lib/components/ui/toggle-group";
	import Seo from "$lib/components/Seo.svelte";
	import tools from "$lib/tools.json";

	import { reverseMappings, isDisabled, solve, type Room } from "./util";

	const emptyState = ["", "", ""];

	// dev only
	const devState1 = ["circle", "square", "triangle"];
	const devState2 = ["sphere", "prism", "prism"];

	const settings = persisted("verity_settings", {
		labels: true,
		verify: true,
		autoScroll: true,
	});

	let footerHeight = $state(0);
	let sidebar = $state<HTMLElement>();
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

	onMount(() => {
		if (sidebar) sidebar.style.marginBottom = `${footerHeight}px`;
	});

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

	async function handleKey(event: KeyboardEvent) {
		if (event.key.toLowerCase() === "f") {
			reset();
		} else if (event.key === "Escape") {
			await goto("/");
		}
	}
</script>

<svelte:window onkeydown={handleKey} />

<Seo
	title="{tools.verity.title} | The First Knife"
	description={tools.verity.description}
	keywords={[
		"salvation's edge",
		"raid",
		"verity",
		"4th encounter",
		"dissect",
		"solver",
		"calculator",
	]}
	url="https://thefirstknife.vercel.app/verity"
	image="/img/{tools.verity.img}"
/>

<div id="verity" class="relative h-full">
	<aside
		class="no-scrollbar inset-0 w-full overflow-auto from-transparent via-black/30 md:fixed md:w-[var(--sidebar-width)] md:bg-gradient-to-b"
		bind:this={sidebar}
	>
		<article class="flex flex-col gap-y-4 px-6 pb-6 text-sm [&>:not(:first-child)]:font-light">
			<header class="mb-2 flex items-center">
				<svg class="size-12" inline-src="raid" fill="#fff"></svg>

				<div class="ml-0.5">
					<h2 class="text-xl font-medium">Verity</h2>
					<p class="text-white/60">See Beyond</p>
				</div>
			</header>

			<p>This tool is an automatic solver for dissecting on the outside.</p>
			<p>
				Input the shapes for both the inside and outside. Combinations that are impossible
				will be grayed out. The solution will show you which shapes to dissect on which
				side.
			</p>
			<p>
				If you have the <code>Verification</code> setting enabled, an accompanying line after
				each swap will display what each statue outside should be holding.
			</p>
			<p>
				For a comprehensive break down of the encounter, I recommend reading this
				<Link href="https://redd.it/1dbieuq">this detailed write-up</Link> by u/Zhentharym.
			</p>

			<div>
				<p class="mb-2 font-normal uppercase tracking-wider text-white/60">Settings</p>

				<fieldset class="space-y-4">
					{@render setting(
						"verify",
						"Verification",
						"Show outside shapes in between dissection steps to verify.",
					)}

					{@render setting(
						"autoScroll",
						"Auto scroll",
						"Automatically scroll the dissection steps into view.",
					)}
				</fieldset>
			</div>
		</article>
	</aside>

	<div id="solver" class="px-8 pb-24 md:ml-[var(--sidebar-width)]">
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
								class="grid grid-cols-1 gap-2 group-data-[room='Outside']:grid-cols-2 lg:!grid-cols-3"
								onValueChange={(value) => {
									room.selected[i] = !value ? "" : `${value}`;
								}}
								bind:value={room.selected[i]}
							>
								{#each room.shapes as shape}
									{@const disabled = isDisabled(room, shape, i)}

									<div class="flex flex-col items-center">
										<ToggleGroup.Item class="size-14" value={shape} {disabled}>
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
						class="grid grid-cols-3 items-center justify-center gap-y-6"
						bind:this={steps}
					>
						{#each groups as group}
							{#each filterGroup(group) as steps}
								{#each steps as step}
									<div class="flex flex-col items-center">
										{#if step.value}
											<svg
												class="size-12"
												use:inlineSvg={`/icons/shapes/${reverseMappings[step.value]}.svg`}
											/>
										{:else}
											<CircleSlash class="size-12 stroke-1 text-white/30" />
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

	<footer
		class="fixed bottom-0 flex w-full justify-end bg-black/50 px-20 pb-8 pt-4 backdrop-blur"
		bind:offsetHeight={footerHeight}
	>
		<div class="flex select-none items-center gap-x-1 font-light">
			<button
				class="reset border border-transparent p-1 hover:border-white active:bg-white/30"
				onclick={reset}
			>
				<kbd></kbd> Reset
			</button>

			<button
				class="border border-transparent p-1 transition-colors duration-500 hover:border-white"
				onclick={async () => await goto("/")}
			>
				<kbd></kbd> Back to Home
			</button>
		</div>
	</footer>
</div>

{#snippet setting(key: keyof typeof $settings, label: string, description: string)}
	<div class="flex items-start">
		<div class="flex h-5 items-center">
			<Checkbox
				id={key}
				checked={$settings[key]}
				aria-describedby="{key}-desc"
				onCheckedChange={(value) => ($settings[key] = Boolean(value))}
			/>
		</div>

		<div class="ml-2.5">
			<Label class="text-sm" for={key}>{label}</Label>
			<p id="{key}-desc" class="mt-0.5 text-xs">{description}</p>
		</div>
	</div>
{/snippet}

<style>
	#verity {
		--sidebar-width: theme("spacing.96");
	}

	aside {
		padding-top: calc(1rem + var(--header-height));
	}

	.reset {
		transition:
			border-color 500ms,
			background-color 100ms;
	}

	@screen md {
		#solver {
			padding-top: calc(2rem + var(--header-height));
		}
	}
</style>
