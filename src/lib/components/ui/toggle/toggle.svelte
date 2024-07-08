<script lang="ts">
	import { Toggle } from "bits-ui";
	import { cn } from "$lib/utils";

	let { children, class: className, pressed, ...rest }: Toggle.Props = $props();
</script>

<Toggle.Root class={cn("interactable button", className)} {...rest} bind:pressed>
	{@render children?.()}
</Toggle.Root>
