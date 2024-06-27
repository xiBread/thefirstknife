<script lang="ts">
	import { Select } from "bits-ui";
	import { cn } from "$lib/utils";

	const { children, class: className, ...rest }: Select.SeparatorProps = $props();
</script>

<Select.Separator class={cn("-mx-1 my-1 h-px bg-muted", className)} {...rest} />
