<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import { clientStore } from '$lib/state/clients.svelte';
	import {
		GENDER_OPTIONS,
		MARITAL_STATUS_OPTIONS,
		STATE_OPTIONS
	} from '$lib/constants/options';
	import { toast } from 'svelte-sonner';
	import type { Client, PersonalInfo } from '$lib/types';

	let { client }: { client: Client } = $props();

	function draftOf(p: PersonalInfo) {
		return { ...p };
	}

	// svelte-ignore state_referenced_locally
	let draft = $state(draftOf(client.personal));

	$effect(() => {
		draft = draftOf(client.personal);
	});

	function save() {
		clientStore.updatePersonal(client.id, draft);
		toast.success('Personal information saved');
	}

	function cancel() {
		draft = draftOf(client.personal);
	}

	function genderLabel() {
		return GENDER_OPTIONS.find((o) => o.value === draft.gender)?.label ?? '';
	}
	function maritalLabel() {
		return MARITAL_STATUS_OPTIONS.find((o) => o.value === draft.maritalStatus)?.label ?? '';
	}
</script>

<div class="grid gap-4 p-4 md:grid-cols-2">
	<div class="grid gap-1.5">
		<Label for="pi-last">Last Name</Label>
		<Input id="pi-last" bind:value={draft.lastName} />
	</div>
	<div class="grid gap-1.5">
		<Label for="pi-first">First Name</Label>
		<Input id="pi-first" bind:value={draft.firstName} />
	</div>
	<div class="grid gap-1.5">
		<Label for="pi-mr">MR#</Label>
		<Input id="pi-mr" value={draft.mrNumber} readonly class="font-mono" />
	</div>
	<div class="grid gap-1.5">
		<Label for="pi-gender">Gender</Label>
		<Select.Root type="single" bind:value={draft.gender as string}>
			<Select.Trigger id="pi-gender" class="w-full">{genderLabel() || 'Select…'}</Select.Trigger>
			<Select.Content>
				{#each GENDER_OPTIONS as opt (opt.value)}
					<Select.Item value={opt.value} label={opt.label}>{opt.label}</Select.Item>
				{/each}
			</Select.Content>
		</Select.Root>
	</div>
	<div class="grid gap-1.5">
		<Label for="pi-ssn">SSN</Label>
		<Input id="pi-ssn" bind:value={draft.ssn} placeholder="000-00-0000" />
	</div>
	<div class="grid gap-1.5">
		<Label for="pi-marital">Marital Status</Label>
		<Select.Root type="single" bind:value={draft.maritalStatus as string}>
			<Select.Trigger id="pi-marital" class="w-full">
				{maritalLabel() || 'Select…'}
			</Select.Trigger>
			<Select.Content>
				{#each MARITAL_STATUS_OPTIONS as opt (opt.value)}
					<Select.Item value={opt.value} label={opt.label}>{opt.label}</Select.Item>
				{/each}
			</Select.Content>
		</Select.Root>
	</div>
	<div class="grid gap-1.5">
		<Label for="pi-dob">DOB</Label>
		<Input id="pi-dob" bind:value={draft.dob} placeholder="MM/DD/YYYY" />
	</div>
	<div class="grid gap-1.5">
		<Label for="pi-address">Address</Label>
		<Input id="pi-address" bind:value={draft.address} />
	</div>
	<div class="grid gap-1.5">
		<Label for="pi-phone">Phone</Label>
		<Input id="pi-phone" type="tel" bind:value={draft.phone} placeholder="(000) 000-0000" />
	</div>
	<div class="grid grid-cols-[1fr_120px_100px] gap-2">
		<div class="grid gap-1.5">
			<Label for="pi-city">City</Label>
			<Input id="pi-city" bind:value={draft.city} />
		</div>
		<div class="grid gap-1.5">
			<Label for="pi-state">State</Label>
			<Select.Root type="single" bind:value={draft.state}>
				<Select.Trigger id="pi-state" class="w-full">{draft.state || '—'}</Select.Trigger>
				<Select.Content class="max-h-72">
					{#each STATE_OPTIONS as opt (opt.value)}
						<Select.Item value={opt.value} label={opt.label}>{opt.label}</Select.Item>
					{/each}
				</Select.Content>
			</Select.Root>
		</div>
		<div class="grid gap-1.5">
			<Label for="pi-zip">ZIP</Label>
			<Input id="pi-zip" bind:value={draft.zip} />
		</div>
	</div>
	<div class="grid gap-1.5 md:col-span-2">
		<Label for="pi-email">Email</Label>
		<Input id="pi-email" type="email" bind:value={draft.email} />
	</div>

	<div class="mt-2 flex gap-2 md:col-span-2">
		<Button onclick={save}>Save</Button>
		<Button variant="outline" onclick={cancel}>Cancel</Button>
	</div>
</div>
