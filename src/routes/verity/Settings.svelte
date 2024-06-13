<script lang="ts">
	import Settings from "lucide-svelte/icons/settings";
	import { Button } from "$lib/components/ui/button";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import * as Tooltip from "$lib/components/ui/tooltip";
	import { veritySettings } from "$lib/stores";
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger class="">
		<Tooltip.Root openDelay={150}>
			<Tooltip.Trigger asChild let:builder>
				<Button class="rounded-full" size="icon" variant="secondary" builders={[builder]}>
					<Settings class="size-5" />
				</Button>
			</Tooltip.Trigger>

			<Tooltip.Content side="left">
				<p class="font-medium">Settings</p>
			</Tooltip.Content>
		</Tooltip.Root>
	</DropdownMenu.Trigger>

	<DropdownMenu.Content side="right">
		<DropdownMenu.Label>Settings</DropdownMenu.Label>
		<DropdownMenu.Separator />
		<DropdownMenu.CheckboxItem bind:checked={$veritySettings.labels}>
			Labels
		</DropdownMenu.CheckboxItem>
		<DropdownMenu.CheckboxItem bind:checked={$veritySettings.verify}>
			Verify
		</DropdownMenu.CheckboxItem>
	</DropdownMenu.Content>
</DropdownMenu.Root>
