<script lang="ts">
	import Check from "lucide-svelte/icons/check";
	import Minus from "lucide-svelte/icons/minus";
	import { Checkbox } from "bits-ui";
	import { cn } from "$lib/utils";

	let { class: className, checked = $bindable(false), ...rest }: Checkbox.Props = $props();
</script>

<Checkbox.Root
	class={cn(
		"interactable peer box-content size-4 shrink-0 focus-visible:outline-none",
		className,
	)}
	{...rest}
	bind:checked
>
	<Checkbox.Indicator
		class={cn("flex size-4 items-center justify-center text-current")}
		let:isChecked
		let:isIndeterminate
	>
		{#if isIndeterminate}
			<Minus class="size-3.5" />
		{:else}
			<Check class={cn("size-3.5", !isChecked && "text-transparent")} />
		{/if}
	</Checkbox.Indicator>
</Checkbox.Root>
