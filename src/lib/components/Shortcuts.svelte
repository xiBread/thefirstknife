<script lang="ts">
	interface Shortcut {
		symbol: string;
		label: string;
		action: () => Promise<void> | void;
	}

	const { shortcuts }: { shortcuts: Record<string, Shortcut> } = $props();

	async function handleKey(event: KeyboardEvent) {
		await shortcuts[event.key.toLowerCase()]?.action();
	}
</script>

<svelte:window onkeydown={handleKey} />

<footer class="fixed bottom-0 flex w-full justify-end bg-black/50 px-16 py-2 backdrop-blur">
	<div class="flex select-none items-center gap-x-1 font-light">
		{#each Object.values(shortcuts) as shortcut}
			<button
				class="shortcut border border-transparent p-1 hover:border-white active:bg-white/30"
				onclick={shortcut.action}
			>
				<kbd>{shortcut.symbol}</kbd>{" "}{shortcut.label}
			</button>
		{/each}
	</div>
</footer>

<style>
	.shortcut {
		transition:
			border-color 500ms,
			background-color 100ms;
	}
</style>
