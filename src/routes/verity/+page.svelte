<script lang="ts" context="module">
	type Shape = keyof typeof shapes;

	export interface Room {
		name: string;
		shapes: Shape[];
		selected: string[];
	}
</script>

<script lang="ts">
	import CheckCheck from "lucide-svelte/icons/check-check";
	import CircleSlash from "lucide-svelte/icons/circle-slash";
	import UserRound from "lucide-svelte/icons/user-round";
	import UsersRound from "lucide-svelte/icons/users-round";
	import { onMount } from "svelte";
	import { persisted } from "svelte-persisted-store";

	import { goto } from "$app/navigation";
	import { Checkbox } from "$lib/components/ui/checkbox";
	import { Label } from "$lib/components/ui/label";
	import { Link } from "$lib/components/ui/link";
	import { Separator } from "$lib/components/ui/separator";
	import * as ToggleGroup from "$lib/components/ui/toggle-group";
	import Seo from "$lib/components/Seo.svelte";
	import tools from "$lib/tools.json";

	import * as shapes from "./shapes";
	import { reverseMappings, isDisabled, solve } from "./util";

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

	async function handleKey(event: KeyboardEvent) {
		if (event.key.toLowerCase() === "f") {
			rooms[0].selected = [...emptyState];
			rooms[1].selected = [...emptyState];
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
	<div
		id="sidebar"
		class="no-scrollbar inset-0 w-full overflow-auto from-transparent via-black/30 md:fixed md:w-[var(--sidebar-width)] md:bg-gradient-to-b"
		bind:this={sidebar}
	>
		<article
			class="flex flex-col space-y-6 px-6 pb-6 text-sm [&>:not(:first-child)]:font-light"
		>
			<header class="flex items-center">
				<svg class="size-12" inline-src="raid" fill="#fff"></svg>

				<div class="ml-0.5">
					<h2 class="text-xl font-medium">Verity</h2>
					<p class="italic text-white/60">See Beyond</p>
				</div>
			</header>

			<p>This tool is an automatic solver for dissecting on the outside.</p>

			<div id="guide" class="section">
				<p class="mb-1 font-normal uppercase tracking-wider text-white/60">Guide</p>
				<p>
					DISCLAIMER: This is only meant to serve as quick reference. For a more
					comprehensive break down of the encounter, I recommend
					<Link href="https://redd.it/1dbieuq">this detailed write-up</Link> by u/Zhentharym.
				</p>
				<p>
					Exercitation et officia velit aute. Ut exercitation ea occaecat reprehenderit.
					Deserunt aliqua consequat labore voluptate reprehenderit cupidatat magna ipsum
					enim.
				</p>
			</div>

			<div id="settings" class="section">
				<p class="mb-2 font-normal uppercase tracking-wider text-white/60">Settings</p>

				<fieldset class="space-y-3 *:flex *:items-start">
					<div>
						<div class="setting-checkbox">
							<Checkbox
								id="verify"
								checked={$settings.verify}
								aria-describedby="verify-desc"
								onCheckedChange={(value) => ($settings.verify = Boolean(value))}
							/>
						</div>

						<div class="ml-2.5">
							<Label class="text-sm" for="verify">Verification</Label>
							<p id="verify-desc" class="mt-0.5 text-xs">
								Show outside shapes in between dissection steps to verify.
							</p>
						</div>
					</div>

					<div>
						<div class="setting-checkbox">
							<Checkbox
								id="autoscroll"
								checked={$settings.autoScroll}
								aria-describedby="autoscroll-desc"
								onCheckedChange={(value) => ($settings.autoScroll = Boolean(value))}
							/>
						</div>

						<div class="ml-2.5">
							<Label class="text-sm" for="autoscroll">Auto scroll</Label>
							<p id="autoscroll-desc" class="mt-0.5 text-xs">
								Automatically scroll the dissection steps into view.
							</p>
						</div>
					</div>
				</fieldset>
			</div>
		</article>
	</div>

	<div id="solver" class="px-8 pb-24 md:ml-[var(--sidebar-width)]">
		<div class="space-y-12">
			{#each rooms as room}
				<div class="grid grid-cols-3 gap-x-4">
					<div class="col-span-full mb-6 flex w-full items-start text-white/60">
						<svelte:component
							this={room.name === "Inside" ? UserRound : UsersRound}
							class="mt-0.5 size-5 stroke-[1.5]"
						/>

						<div class="ml-2 w-full">
							<h3 class="font-light uppercase tracking-[0.15em]">
								{room.name}
							</h3>

							<Separator />
						</div>
					</div>

					{#each ["Left", "Middle", "Right"] as side, i}
						<div class="flex flex-col items-center gap-y-2">
							<ToggleGroup.Root
								class="grid grid-cols-1 gap-2 lg:grid-cols-3"
								onValueChange={(value) => {
									room.selected[i] = !value ? "" : `${value}`;
								}}
								bind:value={room.selected[i]}
							>
								{#each room.shapes as shape}
									{@const disabled = isDisabled(room, shape, i)}

									<div class="flex flex-col items-center">
										<ToggleGroup.Item class="size-14" value={shape} {disabled}>
											<div class="*:size-10">
												{@html shapes[shape]}
											</div>
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
							<h3 class="font-light uppercase tracking-[0.15em]">Solution</h3>

							<Separator />
						</div>
					</div>

					<div
						id="steps"
						class="grid grid-cols-3 items-center justify-center gap-y-4"
						bind:this={steps}
					>
						{#each groups as group}
							{#each filterGroup(group) as steps}
								{#each steps as step}
									<div class="flex flex-col items-center">
										{#if step.value}
											{@const shape = reverseMappings[step.value]}

											<div class="p-2 *:size-12">
												{@html shapes[shape as Shape]}
											</div>
										{:else}
											<CircleSlash
												class="size-16 stroke-1 p-2 text-foreground/30"
											/>
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
		class="fixed bottom-0 flex w-full justify-end bg-black/50 px-24 pb-8 pt-4 backdrop-blur"
		bind:offsetHeight={footerHeight}
	>
		<div class="flex select-none items-center gap-x-4 font-light">
			<p><kbd></kbd> Reset</p>
			<p><kbd></kbd> Back to Home</p>
		</div>
	</footer>
</div>

<style>
	#verity {
		--sidebar-width: theme("spacing.96");
	}

	#sidebar {
		padding-top: calc(1rem + var(--header-height));
	}

	.section > :not(:first-child):is(p) {
		margin-bottom: 1rem;
	}

	.setting-checkbox {
		display: flex;
		align-items: center;
		height: theme("size.5");
	}

	@screen md {
		#solver {
			padding-top: calc(2rem + var(--header-height));
		}
	}
</style>
