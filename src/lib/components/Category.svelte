<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { cn } from "$lib/utils";
	import { Separator } from "./ui/separator";

	const { children, class: className, title, ...rest }: HTMLAttributes<HTMLElement> = $props();
</script>

<header class={cn("mb-6 flex w-full items-start text-white/60", className)} {...rest}>
	{@render children?.()}

	<div class="ml-2 w-full">
		<p class="font-light uppercase tracking-[0.15em]">{title}</p>
		<Separator />
	</div>
</header>
