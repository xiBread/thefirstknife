<script lang="ts">
	import Info from "lucide-svelte/icons/info";
	import { Button } from "$lib/components/ui/button";
	import * as Sheet from "$lib/components/ui/sheet";
	import * as Tooltip from "$lib/components/ui/tooltip";
</script>

<Sheet.Root>
	<Sheet.Trigger class="">
		<Tooltip.Root openDelay={150}>
			<Tooltip.Trigger asChild let:builder>
				<Button class="rounded-full" size="icon" variant="secondary" builders={[builder]}>
					<Info class="size-5" />
				</Button>
			</Tooltip.Trigger>

			<Tooltip.Content side="left">
				<p class="font-medium">Guide</p>
			</Tooltip.Content>
		</Tooltip.Root>
	</Sheet.Trigger>

	<Sheet.Content side="right">
		<Sheet.Header>
			<Sheet.Title>Guide</Sheet.Title>
		</Sheet.Header>

		<p>TODO</p>
	</Sheet.Content>
</Sheet.Root>
