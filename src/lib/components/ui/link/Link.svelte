<script lang="ts">
	import { cn } from "$lib/utils";
	import type { HTMLAnchorAttributes } from "svelte/elements";

	let { children, class: className, target, ...rest }: HTMLAnchorAttributes = $props();

	if (rest.href?.startsWith("http")) {
		target = "_blank";
	}
</script>

<a
	class={cn(
		"underline decoration-white/60 underline-offset-2 transition-[text-decoration-color] duration-300 hover:decoration-white",
		className,
	)}
	{target}
	{...rest}
>
	{@render children?.()}
</a>
