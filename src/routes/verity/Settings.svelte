<script lang="ts">
	import Settings from "lucide-svelte/icons/settings";
	import { Button } from "$lib/components/ui/button";
	import { Checkbox } from "$lib/components/ui/checkbox";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import { Label } from "$lib/components/ui/label";
	import * as Tooltip from "$lib/components/ui/tooltip";
	import { veritySettings } from "$lib/stores";
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
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

	<DropdownMenu.Content class="ml-1.5 max-w-64" side="right">
		<fieldset class="space-y-3 p-2 *:flex *:items-start">
			<div>
				<div class="setting-checkbox">
					<Checkbox
						id="labels"
						checked={$veritySettings.labels}
						aria-describedby="labels-desc"
						onCheckedChange={(value) => ($veritySettings.labels = Boolean(value))}
					/>
				</div>

				<div class="ml-2.5">
					<Label class="text-sm" for="labels">Labels</Label>
					<p id="labels-desc" class="mt-0.5 text-xs">
						Display shape names under their symbol.
					</p>
				</div>
			</div>

			<div>
				<div class="setting-checkbox">
					<Checkbox
						id="verify"
						checked={$veritySettings.verify}
						aria-describedby="verify-desc"
						onCheckedChange={(value) => ($veritySettings.verify = Boolean(value))}
					/>
				</div>

				<div class="ml-2.5">
					<Label class="text-sm" for="verify">Verification</Label>
					<p id="verify-desc" class="mt-0.5 text-xs">
						Show outside shapes in between dissection steps to verify.
					</p>
				</div>
			</div>

			<div>
				<div class="setting-checkbox">
					<Checkbox
						id="autoscroll"
						checked={$veritySettings.autoScroll}
						aria-describedby="autoscroll-desc"
						onCheckedChange={(value) => ($veritySettings.autoScroll = Boolean(value))}
					/>
				</div>

				<div class="ml-2.5">
					<Label class="text-sm" for="autoscroll">Auto scroll</Label>
					<p id="autoscroll-desc" class="mt-0.5 text-xs">
						Automatically scroll the dissection steps into view.
					</p>
				</div>
			</div>
		</fieldset>
	</DropdownMenu.Content>
</DropdownMenu.Root>

<style>
	.setting-checkbox {
		display: flex;
		align-items: center;
		height: theme("size.6");
	}
</style>
