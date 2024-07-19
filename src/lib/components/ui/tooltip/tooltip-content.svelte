<script lang="ts">
	import { Tooltip as Tooltip } from "bits-ui";
	import { cn } from "$lib/utils";

	const { children, class: className, sideOffset = 4, ...rest }: Tooltip.ContentProps = $props();
</script>

<Tooltip.Content class={cn("z-50", className)} {sideOffset} {...rest}>
	{@render children?.()}
</Tooltip.Content>
