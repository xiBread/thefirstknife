<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import * as shapes from "./shapes";

	export let name: keyof typeof shapes;
</script>

<div class="flex flex-col items-center">
	<Button class="size-16" size="icon" variant="ghost">
		<div class="*:size-12">
			{@html shapes[name]}
		</div>
	</Button>

	<span class="mt-1 capitalize">{name}</span>
</div>
