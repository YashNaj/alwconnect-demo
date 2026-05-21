<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import { REFERRAL_TYPE_OPTIONS, REFERRAL_ROLE_OPTIONS } from '$lib/constants/options';
	import { clientStore } from '$lib/state/clients.svelte';
	import { toast } from 'svelte-sonner';
	import type { Client, ReferralSource } from '$lib/types';

	let { client }: { client: Client } = $props();

	// svelte-ignore state_referenced_locally
	let draft = $state<ReferralSource>({ ...client.referral });

	$effect(() => {
		draft = { ...client.referral };
	});

	function save() {
		clientStore.updateReferral(client.id, draft);
		toast.success('Referral source saved');
	}

	function cancel() {
		draft = { ...client.referral };
	}

	const labelFor = (opts: { value: string; label: string }[], v: string) =>
		opts.find((o) => o.value === v)?.label ?? '';
</script>

<div class="grid gap-4 p-4 md:grid-cols-2">
	<div class="grid gap-1.5">
		<Label for="rs-type">Type</Label>
		<Select.Root type="single" bind:value={draft.type as string}>
			<Select.Trigger id="rs-type" class="w-full">
				{labelFor(REFERRAL_TYPE_OPTIONS, draft.type) || 'Select…'}
			</Select.Trigger>
			<Select.Content>
				{#each REFERRAL_TYPE_OPTIONS as opt (opt.value)}
					<Select.Item value={opt.value} label={opt.label}>{opt.label}</Select.Item>
				{/each}
			</Select.Content>
		</Select.Root>
	</div>
	<div class="grid gap-1.5">
		<Label for="rs-individual">Individual</Label>
		<Input id="rs-individual" bind:value={draft.individual} />
	</div>
	<div class="grid gap-1.5">
		<Label for="rs-role">Role</Label>
		<Select.Root type="single" bind:value={draft.role as string}>
			<Select.Trigger id="rs-role" class="w-full">
				{labelFor(REFERRAL_ROLE_OPTIONS, draft.role) || 'Select…'}
			</Select.Trigger>
			<Select.Content>
				{#each REFERRAL_ROLE_OPTIONS as opt (opt.value)}
					<Select.Item value={opt.value} label={opt.label}>{opt.label}</Select.Item>
				{/each}
			</Select.Content>
		</Select.Root>
	</div>
	<div class="grid gap-1.5">
		<Label for="rs-org">Organization</Label>
		<Input id="rs-org" bind:value={draft.organization} />
	</div>

	<div class="mt-2 flex gap-2 md:col-span-2">
		<Button onclick={save}>Save</Button>
		<Button variant="outline" onclick={cancel}>Cancel</Button>
	</div>
</div>
