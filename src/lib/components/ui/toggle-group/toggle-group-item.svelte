<script lang="ts">
	import { ToggleGroup } from "bits-ui";

	const { children, class: className, value, ...rest }: ToggleGroup.ItemProps = $props();
</script>

<ToggleGroup.Item class={className} {value} {...rest}>
	{@render children?.()}
</ToggleGroup.Item>
