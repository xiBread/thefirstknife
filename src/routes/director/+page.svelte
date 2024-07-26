<script lang="ts">
	import { Dialog } from "bits-ui";
	import embla, { type EmblaCarouselType } from "embla-carousel";
	import ArrowLeft from "lucide-svelte/icons/arrow-left";
	import Download from "lucide-svelte/icons/download";
	import X from "lucide-svelte/icons/x";
	import { inlineSvg } from "@svelte-put/inline-svg";
	import { Button } from "$lib/components/ui/button";
	import { Link } from "$lib/components/ui/link";
	import { Separator } from "$lib/components/ui/separator";
	import packs from "./packs.json";

	const lightbox = $state({ open: false, images: [] as string[] });

	let carousel = $state<EmblaCarouselType>();
	let carouselRoot = $state<HTMLElement>();

	let currentSlide = $state(0);
	let canScrollPrev = $state(false);
	let canScrollNext = $state(true);

	$effect(() => {
		if (carouselRoot) {
			carousel = embla(carouselRoot);
		}
	});

	$effect(() => {
		carousel?.on("select", () => {
			if (!carousel) return;

			currentSlide = carousel.selectedScrollSnap();
			canScrollPrev = carousel.canScrollPrev();
			canScrollNext = carousel.canScrollNext();
		});
	});

	$effect(() => {
		if (!lightbox.open) {
			currentSlide = 0;
			canScrollPrev = false;
			canScrollNext = true;
		}
	});

	const groups = Object.groupBy(packs, (map) => map.type);
</script>

<div class="space-y-6 px-4 pb-10 pt-2 sm:px-6">
	{#each Object.entries(groups) as [type, packs]}
		<div>
			<div class="col-span-full flex w-full items-start text-white/60">
				<svg
					class="size-8 fill-current"
					data-type={type}
					use:inlineSvg={`/icons/${type}.svg`}
				/>

				<div class="ml-2 w-full">
					<p class="font-light uppercase tracking-[0.15em]">{type}</p>

					<Separator />
				</div>
			</div>

			<div
				class="grid-auto-fill ml-10 mt-2 grid gap-x-3 gap-y-6"
				style:--grid-fill-min="400px"
			>
				{#each packs ?? [] as pack}
					<div class="relative">
						<figure>
							<Button
								class="bg-transparent"
								size="none"
								onclick={() => {
									lightbox.open = true;
									lightbox.images = pack.maps;
								}}
							>
								<img
									class="relative -z-[5] aspect-video object-cover"
									src="https://cdn.thefirstknife.com/maps/{pack.maps[0]}"
									alt={pack.title}
									width="1280"
									height="720"
								/>
							</Button>

							<figcaption class="mt-2">{pack.title}</figcaption>
						</figure>

						<div class="flex items-center justify-between">
							<cite class="text-sm">
								<Link href={pack.author.url}>{pack.author.username}</Link>
							</cite>

							<a
								class="interactable absolute bottom-1 right-0 mr-1 size-9"
								href="https://cdn.thefirstknife.com/maps/{pack.download}"
								download
								aria-label="Download map pack"
							>
								<Download class="size-5" />
							</a>
						</div>
					</div>
				{/each}
			</div>
		</div>
	{/each}
</div>

<Dialog.Root bind:open={lightbox.open}>
	<Dialog.Portal>
		<Dialog.Overlay class="fixed inset-0 z-50 backdrop-blur" />

		<Dialog.Content
			class="fixed left-1/2 top-1/2 z-50 w-full max-w-[85%] -translate-x-1/2 -translate-y-1/2"
		>
			<div class="overflow-hidden">
				<div bind:this={carouselRoot}>
					<div class="flex">
						{#each lightbox.images as image}
							<div class="mr-4 min-w-0 flex-[0_0_100%] last:mr-0">
								<img
									class="aspect-video object-contain"
									src="https://cdn.thefirstknife.com/maps/{image}"
									alt=""
								/>
							</div>
						{/each}
					</div>
				</div>
			</div>

			<div class="mt-4 flex justify-between">
				<div class="flex gap-x-1.5">
					<Button
						size="square"
						disabled={!canScrollPrev}
						aria-label="Previous"
						onclick={() => carousel?.scrollPrev()}
					>
						<ArrowLeft class="size-4" />
					</Button>

					{#each lightbox.images as _, i}
						<Button
							size="square"
							data-state={i === currentSlide ? "on" : null}
							aria-label="Slide {i + 1}"
							onclick={() => carousel?.scrollTo(i)}
						>
							{i + 1}
						</Button>
					{/each}

					<Button
						size="square"
						disabled={!canScrollNext}
						aria-label="Next"
						onclick={() => carousel?.scrollNext()}
					>
						<ArrowLeft class="size-4 -scale-x-100" />
					</Button>
				</div>

				<div class="flex gap-x-1.5">
					<a
						class="interactable size-9"
						href="https://cdn.thefirstknife.com/maps/{lightbox.images[currentSlide]}"
						download
						aria-label="Download map"
					>
						<Download class="size-4" />
					</a>

					<Button
						size="square"
						aria-label="Close"
						onclick={() => (lightbox.open = false)}
					>
						<X class="size-4" />
					</Button>
				</div>
			</div>
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
