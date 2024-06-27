<script lang="ts">
	import { Select } from "bits-ui";
	import { cn } from "$lib/utils";

	const { children, class: className, ...rest }: Select.LabelProps = $props();
</script>

<Select.Label class={cn("px-2 py-1.5 text-sm font-semibold", className)} {...rest}>
	{@render children?.()}
</Select.Label>
