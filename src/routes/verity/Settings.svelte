<script lang="ts">
	import Settings from "lucide-svelte/icons/settings";
	import { Button } from "$lib/components/ui/button";
	import { Label } from "$lib/components/ui/label";
	import * as Sheet from "$lib/components/ui/sheet";
	import { Switch } from "$lib/components/ui/switch";
	import * as Tooltip from "$lib/components/ui/tooltip";

	function updateSettings(key: string, value: unknown) {
		localStorage.setItem(key, `${value}`);
	}
</script>

<Sheet.Root>
	<Sheet.Trigger class="fixed right-4 top-1/2 -translate-y-1/2">
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
	</Sheet.Trigger>

	<Sheet.Content side="right">
		<Sheet.Header>
			<Sheet.Title>Settings</Sheet.Title>
		</Sheet.Header>

		<div class="mt-6 flex items-center">
			<Switch
				id="verify"
				onCheckedChange={(value) => updateSettings("verity_verify", value)}
			/>
			<Label class="ml-2" for="verify">Show in between steps to verify</Label>
		</div>
	</Sheet.Content>
</Sheet.Root>
