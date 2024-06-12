<script>
	import "../app.css";
	import { ModeWatcher } from "mode-watcher";
	import Header from "$lib/components/Header.svelte";
</script>

<ModeWatcher />

<Header />

<main class="mx-auto max-w-7xl py-16">
	<slot />
</main>
