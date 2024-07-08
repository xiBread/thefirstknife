<script lang="ts">
	import { Label } from "bits-ui";
	import { cn } from "$lib/utils";

	const { children, class: className, ...rest }: Label.Props = $props();
</script>

<Label.Root
	class={cn(
		"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
		className,
	)}
	{...rest}
>
	{@render children?.()}
</Label.Root>
