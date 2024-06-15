<script lang="ts">
	import Moon from "lucide-svelte/icons/moon";
	import Sun from "lucide-svelte/icons/sun";
	import { mode, toggleMode } from "mode-watcher";
	import { subtitle } from "$lib/stores";
	import { Label } from "./ui/label";
	import { Separator } from "./ui/separator";
	import { Switch } from "./ui/switch";
</script>

<header class="border border-b p-4 sm:px-6 md:px-10">
	<div class="flex items-center justify-between">
		<a class="flex items-center gap-x-3" href="/">
			<img class="size-8 rounded" src="./logo.png" alt="Logo" width="128" height="128" />

			<h1 class="text-xl font-bold">The First Knife</h1>
			<Separator class="h-6" orientation="vertical" />
			<h2 class="text-xl font-light">{$subtitle}</h2>
		</a>

		<div class="flex items-center gap-x-6">
			<div class="flex items-center gap-x-3">
				<Label class="sr-only" for="theme-switch">Theme toggle</Label>

				<Sun class="size-5 dark:text-foreground/20" />
				<Switch id="theme-switch" checked={$mode === "dark"} onCheckedChange={toggleMode} />
				<Moon class="size-5 text-foreground/20 dark:text-foreground" />
			</div>
		</div>
	</div>
</header>
