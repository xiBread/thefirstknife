<script lang="ts">
	import dayjs from "dayjs";
	import LogOut from "lucide-svelte/icons/log-out";
	import { page } from "$app/stores";
	import { Button } from "./ui/button";
	import { Link } from "./ui/link";

	const now = dayjs();
	const year = now.year();

	const isPrideMonth = now.isBetween(`${year}-06-01`, `${year}-06-30`);
</script>

<header class="fixed z-10 w-full border-b border-b-white/10 px-8 backdrop-blur md:px-14">
	<div class="flex h-[var(--header-height)] items-center justify-between">
		<div class="flex items-center gap-x-3">
			<a class="flex items-center gap-x-3" href="/">
				{#if isPrideMonth}
					{@render logo("/favicon-pride.png", "shadow dark:shadow-none")}
				{:else}
					{@render logo("/favicon.svg", "invert dark:invert-0")}
				{/if}

				<h1 class="text-xl font-medium">The First Knife</h1>
			</a>
		</div>

		<div class="flex items-center gap-x-1.5 text-sm">
			{#if $page.data.user}
				{@const [username, discriminator] = $page.data.user.bungieName.split("#")}

				<Button
					class="pointer-events-none text-sm [text-transform:none]"
					size="sm"
					disabled
				>
					{username}
					<span class="text-[#01d9f8]">#{discriminator}</span>
				</Button>

				<form method="post" action="/?/signOut">
					<Button class="size-8" size="square" type="submit" aria-label="Sign out">
						<LogOut class="size-4" />
					</Button>
				</form>
			{:else}
				<Link
					class="interactable px-3 py-1.5 no-underline transition-[inherit]"
					href="/auth"
				>
					<svg class="mr-2 size-4" inline-src="bungie"></svg>
					Sign in
				</Link>
			{/if}
		</div>
	</div>
</header>

{#snippet logo(src: string, className?: string)}
	<img class="size-7 rounded {className}" {src} alt="The First Knife" width="128" height="128" />
{/snippet}
