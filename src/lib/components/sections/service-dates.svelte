<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import {
		STATUS_OPTIONS,
		WAITLIST_TYPE_OPTIONS,
		TRANSFER_OPTIONS,
		RE_ENROLLMENT_OPTIONS
	} from '$lib/constants/options';
	import { clientStore } from '$lib/state/clients.svelte';
	import { toast } from 'svelte-sonner';
	import type { Client, ServiceDates } from '$lib/types';

	let { client }: { client: Client } = $props();

	// svelte-ignore state_referenced_locally
	let draft = $state<ServiceDates>({ ...client.serviceDates });

	$effect(() => {
		draft = { ...client.serviceDates };
	});

	function save() {
		clientStore.updateServiceDates(client.id, draft);
		toast.success('Service dates saved');
	}

	function cancel() {
		draft = { ...client.serviceDates };
	}

	const labelFor = (opts: { value: string; label: string }[], v: string) =>
		opts.find((o) => o.value === v)?.label ?? '';
</script>

<div class="grid gap-4 p-4 md:grid-cols-2">
	<div class="grid gap-1.5">
		<Label for="sd-referral">Referral Date</Label>
		<Input id="sd-referral" placeholder="MM/DD/YYYY" bind:value={draft.referralDate} />
	</div>
	<div class="grid gap-1.5">
		<Label for="sd-enroll">Enrollment Date</Label>
		<Input id="sd-enroll" placeholder="MM/DD/YYYY" bind:value={draft.enrollmentDate} />
	</div>
	<div class="grid gap-1.5">
		<Label for="sd-waitlist">Waitlist Date</Label>
		<Input id="sd-waitlist" placeholder="MM/DD/YYYY" bind:value={draft.waitlistDate} />
	</div>
	<div class="grid gap-1.5">
		<Label for="sd-disenroll">Disenrollment Date</Label>
		<Input id="sd-disenroll" placeholder="MM/DD/YYYY" bind:value={draft.disenrollmentDate} />
	</div>

	<div class="grid gap-1.5">
		<Label for="sd-waitlist-type">Waitlist Type</Label>
		<Select.Root type="single" bind:value={draft.waitlistType as string}>
			<Select.Trigger id="sd-waitlist-type" class="w-full">
				{labelFor(WAITLIST_TYPE_OPTIONS, draft.waitlistType) || 'Select…'}
			</Select.Trigger>
			<Select.Content>
				{#each WAITLIST_TYPE_OPTIONS as opt (opt.value)}
					<Select.Item value={opt.value} label={opt.label}>{opt.label}</Select.Item>
				{/each}
			</Select.Content>
		</Select.Root>
	</div>

	<div class="grid gap-1.5">
		<Label for="sd-disenroll-reason">Disenrollment Reason</Label>
		<Textarea id="sd-disenroll-reason" rows={2} bind:value={draft.disenrollmentReason} />
	</div>

	<div class="grid gap-1.5">
		<Label for="sd-release">Waitlist Release Date</Label>
		<Input id="sd-release" placeholder="MM/DD/YYYY" bind:value={draft.waitlistReleaseDate} />
	</div>

	<div class="grid gap-1.5">
		<Label for="sd-status">Status</Label>
		<Select.Root type="single" bind:value={draft.status as string}>
			<Select.Trigger id="sd-status" class="w-full">
				{labelFor(STATUS_OPTIONS, draft.status) || 'Select…'}
			</Select.Trigger>
			<Select.Content>
				{#each STATUS_OPTIONS as opt (opt.value)}
					<Select.Item value={opt.value} label={opt.label}>{opt.label}</Select.Item>
				{/each}
			</Select.Content>
		</Select.Root>
	</div>

	<div class="grid gap-1.5">
		<Label for="sd-submit">Application Submission Date</Label>
		<Input
			id="sd-submit"
			placeholder="MM/DD/YYYY"
			bind:value={draft.applicationSubmissionDate}
		/>
	</div>

	<div class="grid gap-1.5">
		<Label for="sd-transfer">Transfer</Label>
		<Select.Root type="single" bind:value={draft.transfer as string}>
			<Select.Trigger id="sd-transfer" class="w-full">
				{labelFor(TRANSFER_OPTIONS, draft.transfer) || 'N/A'}
			</Select.Trigger>
			<Select.Content>
				{#each TRANSFER_OPTIONS as opt (opt.value)}
					<Select.Item value={opt.value} label={opt.label}>{opt.label}</Select.Item>
				{/each}
			</Select.Content>
		</Select.Root>
	</div>

	<div class="grid gap-1.5">
		<Label for="sd-reenroll">Re-Enrollment</Label>
		<Select.Root type="single" bind:value={draft.reEnrollment as string}>
			<Select.Trigger id="sd-reenroll" class="w-full">
				{labelFor(RE_ENROLLMENT_OPTIONS, draft.reEnrollment) || 'N/A'}
			</Select.Trigger>
			<Select.Content>
				{#each RE_ENROLLMENT_OPTIONS as opt (opt.value)}
					<Select.Item value={opt.value} label={opt.label}>{opt.label}</Select.Item>
				{/each}
			</Select.Content>
		</Select.Root>
	</div>

	<div class="mt-2 flex gap-2 md:col-span-2">
		<Button onclick={save}>Save</Button>
		<Button variant="outline" onclick={cancel}>Cancel</Button>
	</div>
</div>
