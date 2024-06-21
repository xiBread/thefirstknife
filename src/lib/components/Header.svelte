<script lang="ts">
	import dayjs from "dayjs";
	import Moon from "lucide-svelte/icons/moon";
	import Sun from "lucide-svelte/icons/sun";
	import { mode, toggleMode } from "mode-watcher";
	import { subtitle } from "$lib/stores";
	import { Label } from "./ui/label";
	import { Separator } from "./ui/separator";
	import { Switch } from "./ui/switch";

	const now = dayjs();
	const year = now.year();

	const isPrideMonth = now.isBetween(`${year}-06-01`, `${year}-06-30`);
</script>

<header class="border border-b p-4 sm:px-6 md:px-10">
	<div class="flex items-center justify-between">
		<div class="flex items-center gap-x-3">
			<a class="flex items-center gap-x-3" href="/">
				{#if isPrideMonth}
					<img
						class="size-8 rounded shadow"
						src="/favicon-pride.png"
						alt="The First Knife"
						width="128"
						height="128"
					/>
				{:else}
					<img
						class="size-8 rounded invert dark:invert-0"
						src="/favicon.svg"
						alt="The First Knife"
						width="128"
						height="128"
					/>
				{/if}

				<h1 class="text-xl font-semibold">The First Knife</h1>
			</a>

			<Separator class="h-6" orientation="vertical" />
			<h2 class="text-xl font-light">{$subtitle}</h2>
		</div>

		<div class="flex items-center gap-x-3">
			<Label class="sr-only" for="theme-switch">Theme toggle</Label>

			<Sun class="size-5 dark:text-foreground/20" />
			<Switch id="theme-switch" checked={$mode === "dark"} onCheckedChange={toggleMode} />
			<Moon class="size-5 text-foreground/20 dark:text-foreground" />
		</div>
	</div>
</header>
