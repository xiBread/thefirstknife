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

	<DropdownMenu.Content class="max-w-64" side="right">
		<fieldset class="space-y-5 p-2">
			<div class="flex items-start">
				<div class="flex h-6 items-center">
					<Checkbox
						id="labels"
						checked={$veritySettings.labels}
						aria-describedby="labels-desc"
						onCheckedChange={(value) => ($veritySettings.labels = Boolean(value))}
					/>
				</div>

				<div class="ml-3">
					<Label class="text-sm" for="labels">Labels</Label>
					<p id="labels-desc" class="mt-0.5 text-xs">
						Display shape names under their symbol.
					</p>
				</div>
			</div>

			<div class="flex items-start">
				<div class="flex h-6 items-center">
					<Checkbox
						id="verify"
						checked={$veritySettings.verify}
						aria-describedby="verify-desc"
						onCheckedChange={(value) => ($veritySettings.verify = Boolean(value))}
					/>
				</div>

				<div class="ml-3">
					<Label class="text-sm" for="verify">Verification</Label>
					<p id="verify-desc" class="mt-0.5 text-xs">
						Show outside shapes in between dissection steps to verify.
					</p>
				</div>
			</div>
		</fieldset>
	</DropdownMenu.Content>
</DropdownMenu.Root>
