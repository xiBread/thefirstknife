<script lang="ts">
	import { Select } from "bits-ui";
	import { scale } from "svelte/transition";
	import { cn, flyAndScale } from "$lib/utils";

	const {
		children,
		class: className,
		sideOffset = 4,
		inTransition = flyAndScale,
		inTransitionConfig,
		outTransition = scale,
		outTransitionConfig = {
			start: 0.95,
			opacity: 0,
			duration: 50,
		},
		...rest
	}: Select.ContentProps = $props();
</script>

<Select.Content
	class={cn("relative z-50 min-w-[8rem] focus:outline-none", className)}
	{sideOffset}
	{inTransition}
	{inTransitionConfig}
	{outTransition}
	{outTransitionConfig}
	{...rest}
>
	<div class="w-full space-y-1">
		{@render children?.()}
	</div>
</Select.Content>
