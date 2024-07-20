<script lang="ts">
	import type { Snippet } from "svelte";
	import { computePosition, flip, shift, offset } from "@floating-ui/dom";

	interface Props {
		trigger: Snippet;
		content: Snippet;
	}

	const { trigger, content }: Props = $props();

	let show = $state(false);
	let floatRef = $state<HTMLElement>();

	async function updatePos({ clientX: x, clientY: y }: MouseEvent) {
		if (!floatRef) return;

		const virtualRef = {
			getBoundingClientRect() {
				return {
					x,
					y,
					top: y,
					right: x,
					bottom: y,
					left: x,
					width: 0,
					height: 0,
				};
			},
		};

		const pos = await computePosition(virtualRef, floatRef, {
			middleware: [
				offset({
					mainAxis: 20,
					crossAxis: 20,
					alignmentAxis: 20,
				}),
				flip(),
				shift(),
			],
			placement: "top-start",
		});

		floatRef.style.top = `${pos.y}px`;
		floatRef.style.left = `${pos.x}px`;
	}

	function portal(node: HTMLElement) {
		const update = () => document.body.appendChild(node);
		update();

		return {
			update,
			destroy() {
				node.parentNode?.removeChild(node);
			},
		};
	}
</script>

<svelte:window onpointermove={updatePos} />

<div class="contents" onpointerenter={() => (show = true)} onpointerleave={() => (show = false)}>
	{@render trigger()}
</div>

{#if show}
	<div class="absolute z-50" role="tooltip" tabindex="-1" bind:this={floatRef} use:portal>
		{@render content()}
	</div>
{/if}
