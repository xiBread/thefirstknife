<script lang="ts">
	import { builderActions, getAttrs, type Builder } from "bits-ui";
	import type { HTMLButtonAttributes } from "svelte/elements";
	import { cn } from "$lib/utils";

	interface Props extends HTMLButtonAttributes {
		size?: keyof typeof sizes;
		builders?: Builder[];
	}

	const sizes = {
		default: "h-9 px-4 py-2",
		sm: "h-8 px-3 text-xs",
		lg: "h-10 px-8",
		square: "size-9",
	};

	const {
		children,
		class: className,
		size = "default",
		builders = [],
		...rest
	}: Props = $props();
</script>

{#if builders.length}
	<button
		class={cn("interactable button", sizes[size], className)}
		type="button"
		{...rest}
		{...getAttrs(builders)}
		use:builderActions={{ builders }}
	>
		{@render children?.()}
	</button>
{:else}
	<button
		class={cn("interactable button text-sm uppercase", sizes[size], className)}
		type="button"
		{...rest}
	>
		{@render children?.()}
	</button>
{/if}
