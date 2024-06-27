<script lang="ts">
	import { Separator } from "bits-ui";
	import { cn } from "$lib/utils";

	const {
		class: className,
		orientation = "horizontal",
		decorative,
		...rest
	}: Separator.Props = $props();
</script>

<Separator.Root
	class={cn(
		"shrink-0 bg-white/60",
		orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
		className,
	)}
	{orientation}
	{decorative}
	{...rest}
/>
