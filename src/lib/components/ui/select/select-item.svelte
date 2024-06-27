<script lang="ts">
	import { Select } from "bits-ui";
	import { cn } from "$lib/utils";

	const {
		children,
		class: className,
		value,
		label,
		disabled,
		...rest
	}: Select.ItemProps = $props();
</script>

<Select.Item
	class={cn(
		"interactable h-9 justify-start px-4 font-light brightness-110 backdrop-blur-md data-[highlighted]:z-10",
		className,
	)}
	{value}
	{label}
	{disabled}
	{...rest}
>
	{#if children}
		{@render children()}
	{:else}
		{label || value}
	{/if}
</Select.Item>
