<script lang="ts">
	import { Select } from "bits-ui";
	import ChevronDown from "lucide-svelte/icons/chevron-down";
	import { cn } from "$lib/utils";

	const { children, class: className, ...rest }: Select.TriggerProps = $props();
</script>

<Select.Trigger
	class={cn(
		"interactable h-9 justify-between py-2 pl-4 pr-3 data-[placeholder]:[&>span]:text-white/60",
		className,
	)}
	{...rest}
>
	{@render children?.()}

	<div>
		<ChevronDown class="size-5" />
	</div>
</Select.Trigger>
