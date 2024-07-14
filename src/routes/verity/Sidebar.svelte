<script lang="ts">
	import { Checkbox } from "$lib/components/ui/checkbox";
	import { Label } from "$lib/components/ui/label";
	import { Link } from "$lib/components/ui/link";
	import { settings } from "./+page.svelte";

	const { marginBottom = 0 } = $props();
</script>

<aside
	class="no-scrollbar inset-0 w-full overflow-auto from-transparent via-black/30 md:fixed md:w-[var(--sidebar-width)] md:bg-gradient-to-b"
	style:margin-bottom="{marginBottom}px"
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
			Input the shapes for both the inside and outside. Combinations that are impossible will
			be grayed out. The solution will show you which shapes to dissect on which side.
		</p>
		<p>
			If you have the <code>Verification</code> setting enabled, an accompanying line after
			each swap will display what each statue outside should be holding in
			<span class="text-sky-400">blue</span>.
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
	aside {
		padding-top: calc(1rem + var(--header-height));
	}
</style>
