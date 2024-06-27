<script lang="ts" generics="T extends 'single' | 'multiple'">
	import { ToggleGroup, type Builder } from "bits-ui";
	import type { Snippet } from "svelte";
	import { cn } from "$lib/utils";

	type Props = ToggleGroup.Props<T> &
		(
			| { children: Snippet; delegate?: never }
			| { children?: never; delegate: Snippet<[Builder]> }
		);

	let { children, delegate, class: className, value = $bindable(), ...rest }: Props = $props();
</script>

<ToggleGroup.Root
	class={cn("flex items-center justify-center gap-1", className)}
	{...rest}
	bind:value
	let:builder
>
	{#if children}
		{@render children()}
	{:else}
		{@render delegate!(builder)}
	{/if}
</ToggleGroup.Root>
