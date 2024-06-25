<script lang="ts">
	import dayjs from "dayjs";

	const now = dayjs();
	const year = now.year();

	const isPrideMonth = now.isBetween(`${year}-06-01`, `${year}-06-30`);
</script>

<header class="fixed z-10 w-full px-6 backdrop-blur md:px-10">
	<div class="flex h-[var(--titlebar-height)] items-center justify-between">
		<div class="flex items-center gap-x-3">
			<a class="flex items-center gap-x-3" href="/">
				{#if isPrideMonth}
					{@render logo("/favicon-pride.png", "shadow dark:shadow-none")}
				{:else}
					{@render logo("/favicon.svg", "invert dark:invert-0")}
				{/if}

				<h1 class="text-xl font-semibold">The First Knife</h1>
			</a>
		</div>
	</div>
</header>

{#snippet logo(src: string, className?: string)}
	<img class="size-8 rounded {className}" {src} alt="The First Knife" width="128" height="128" />
{/snippet}

<style>
	header {
		height: var(--header-height);
		border-bottom: 1px solid color-mix(in srgb, #fff 10%, #0000);
	}
</style>
