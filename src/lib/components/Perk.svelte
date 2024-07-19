<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";

	interface Props extends HTMLAttributes<HTMLDivElement> {
		type: string;
		name: string;
		description: string;
	}

	const { class: clasName, type, name, description, ...rest }: Props = $props();
</script>

<div class="relative w-[400px] backdrop-blur-[2px]">
	<div class="flex flex-col border-t-4 border-t-[#aeaeae] bg-black/85">
		<div class="p-2.5">
			<p class="text-xl/tight font-semibold uppercase tracking-wide">{name}</p>
			<p class="text-sm font-light text-white/60">{type}</p>
		</div>

		<div class="bg-neutral-800/75 p-2.5">
			<p class="text-sm font-light text-white/70">{description}</p>
		</div>
	</div>
</div>
