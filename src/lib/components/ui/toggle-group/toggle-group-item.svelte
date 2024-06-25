<script lang="ts">
	import { ToggleGroup } from "bits-ui";
	import { cn } from "$lib/utils";

	const { children, class: className, value, ...rest }: ToggleGroup.ItemProps = $props();
</script>

<ToggleGroup.Item class={cn("interactable button", className)} {value} {...rest}>
	{@render children?.()}
</ToggleGroup.Item>
