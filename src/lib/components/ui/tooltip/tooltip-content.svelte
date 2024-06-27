<script lang="ts">
	import { Tooltip } from "bits-ui";
	import { cn, flyAndScale } from "$lib/utils.js";

	const {
		children,
		class: className,
		sideOffset = 8,
		transition = flyAndScale,
		transitionConfig = { y: 8, duration: 150 },
		...rest
	}: Tooltip.ContentProps = $props();
</script>

<Tooltip.Content
	class={cn(
		"z-50 overflow-hidden bg-primary px-3 py-1.5 text-xs text-primary-foreground",
		className,
	)}
	{sideOffset}
	{transition}
	{transitionConfig}
	{...rest}
>
	{@render children?.()}
</Tooltip.Content>
