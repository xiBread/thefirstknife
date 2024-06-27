<script lang="ts">
	import { page } from "$app/stores";
	import { Link } from "$lib/components/ui/link";
</script>

<svelte:window
	onkeydown={(event) => {
		if (event.key === "Escape") history.back();
	}}
/>

<div class="absolute top-1/2 w-full -translate-y-1/2">
	<div class="flex w-full flex-col">
		<div class="h-1.5 bg-red-800/60"></div>

		<div class="flex w-full">
			<div class="flex w-1/3 justify-end bg-black/20 p-8">
				<div
					class="flex size-20 rotate-45 items-center justify-center border-2 border-red-800/40"
				>
					<div
						class="relative flex size-[4.5rem] items-center justify-center border-2 border-red-800/60"
					>
						<div class="size-14 rounded-full bg-red-800/20"></div>

						<div
							class="absolute flex -rotate-45 scale-125 flex-col gap-y-2 *:bg-red-800/90"
						>
							<div class="h-8 w-3.5"></div>
							<div class="size-3.5 rounded-full"></div>
						</div>
					</div>
				</div>
			</div>

			<div class="flex w-full flex-col">
				<div class="bg-red-900/20">
					<h2 class="px-8 py-6 text-2xl/none font-medium uppercase tracking-[.5em]">
						Error
					</h2>
				</div>

				<div class="max-w-3xl space-y-4 px-8 pb-10 pt-6 text-sm font-light">
					<p>{$page.status}: {$page.error?.message}</p>

					<p>
						If this error persists, please file an issue with the information above at
						<Link href="https://github.com/xiBread/thefirstknife">
							xiBread/thefirstknife
						</Link>.
					</p>
				</div>
			</div>
		</div>

		<div class="w-full bg-black/50">
			<div class="ml-[calc(25%+2.5rem-2px)] text-sm font-light">
				<button
					class="p-1 outline outline-1 outline-transparent transition-[outline] duration-500 hover:outline-white"
					onclick={() => history.back()}
				>
					<kbd></kbd> Back
				</button>
			</div>
		</div>
	</div>
</div>
