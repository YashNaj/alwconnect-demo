<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import * as Table from '$lib/components/ui/table/index.js';
	import { POS_TYPE_OPTIONS, STATE_OPTIONS } from '$lib/constants/options';
	import { clientStore } from '$lib/state/clients.svelte';
	import { toast } from 'svelte-sonner';
	import type { Client, PlaceOfService } from '$lib/types';

	let { client }: { client: Client } = $props();

	const blank = (): Omit<PlaceOfService, 'id'> => ({
		type: '',
		effectiveDate: '',
		facilityName: '',
		address: '',
		city: '',
		state: '',
		zip: '',
		phone: '',
		email: ''
	});

	// svelte-ignore state_referenced_locally
	let draft = $state<Omit<PlaceOfService, 'id'>>(
		// svelte-ignore state_referenced_locally
		client.pos.current ? { ...client.pos.current } : blank()
	);

	$effect(() => {
		draft = client.pos.current ? { ...client.pos.current } : blank();
	});

	function update() {
		clientStore.upsertCurrentPOS(client.id, draft);
		toast.success('Place of Service updated');
	}

	function addNew() {
		if (!draft.type && !draft.facilityName) {
			toast.error('Add a Type or Facility Name before saving');
			return;
		}
		clientStore.addPOSToHistory(client.id, draft);
		toast.success('Added to history');
		draft = blank();
	}

	function cancel() {
		draft = client.pos.current ? { ...client.pos.current } : blank();
	}

	function deletePOS() {
		clientStore.deletePOS(client.id);
		toast.success('Current Place of Service cleared');
		draft = blank();
	}

	function selectHistory(id: string) {
		clientStore.promoteHistoryToCurrent(client.id, id);
		toast.success('Promoted to current Place of Service');
	}

	const typeLabel = $derived(POS_TYPE_OPTIONS.find((o) => o.value === draft.type)?.label ?? '');
</script>

<div class="grid gap-4 p-4 lg:grid-cols-[1fr_1fr]">
	<div class="space-y-3">
		<div class="grid gap-1.5">
			<Label for="pos-type">Type</Label>
			<Select.Root type="single" bind:value={draft.type as string}>
				<Select.Trigger id="pos-type" class="w-full">{typeLabel || 'Select…'}</Select.Trigger>
				<Select.Content>
					{#each POS_TYPE_OPTIONS as opt (opt.value)}
						<Select.Item value={opt.value} label={opt.label}>{opt.label}</Select.Item>
					{/each}
				</Select.Content>
			</Select.Root>
		</div>
		<div class="grid gap-1.5">
			<Label for="pos-eff">Effective Date</Label>
			<Input id="pos-eff" placeholder="MM/DD/YYYY" bind:value={draft.effectiveDate} />
		</div>
		<div class="grid gap-1.5">
			<Label for="pos-facility">Facility Name</Label>
			<Input id="pos-facility" bind:value={draft.facilityName} />
		</div>
		<div class="grid gap-1.5">
			<Label for="pos-address">Address</Label>
			<Input id="pos-address" bind:value={draft.address} />
		</div>
		<div class="grid grid-cols-[1fr_120px_100px] gap-2">
			<div class="grid gap-1.5">
				<Label for="pos-city">City</Label>
				<Input id="pos-city" bind:value={draft.city} />
			</div>
			<div class="grid gap-1.5">
				<Label for="pos-state">State</Label>
				<Select.Root type="single" bind:value={draft.state}>
					<Select.Trigger id="pos-state" class="w-full">{draft.state || '—'}</Select.Trigger>
					<Select.Content class="max-h-72">
						{#each STATE_OPTIONS as opt (opt.value)}
							<Select.Item value={opt.value} label={opt.label}>{opt.label}</Select.Item>
						{/each}
					</Select.Content>
				</Select.Root>
			</div>
			<div class="grid gap-1.5">
				<Label for="pos-zip">ZIP</Label>
				<Input id="pos-zip" bind:value={draft.zip} />
			</div>
		</div>
		<div class="grid gap-1.5">
			<Label for="pos-phone">Phone</Label>
			<Input id="pos-phone" type="tel" bind:value={draft.phone} />
		</div>
		<div class="grid gap-1.5">
			<Label for="pos-email">Email</Label>
			<Input id="pos-email" type="email" bind:value={draft.email} />
		</div>

		<div class="flex flex-wrap gap-2 pt-2">
			<Button onclick={update}>Update POS</Button>
			<Button variant="outline" onclick={cancel}>Cancel</Button>
			<Button variant="destructive" onclick={deletePOS}>Delete POS</Button>
			<Button variant="secondary" onclick={addNew}>Add new</Button>
		</div>
	</div>

	<div class="rounded-lg border p-4">
		<h4 class="mb-2 text-sm font-semibold">History of Place of Service (POS)</h4>
		<Table.Root>
			<Table.Header>
				<Table.Row>
					<Table.Head>Type</Table.Head>
					<Table.Head>Facility Name</Table.Head>
					<Table.Head>Effective Date</Table.Head>
					<Table.Head class="w-24"></Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each client.pos.history as h (h.id)}
					<Table.Row>
						<Table.Cell>{h.type}</Table.Cell>
						<Table.Cell>{h.facilityName}</Table.Cell>
						<Table.Cell>{h.effectiveDate}</Table.Cell>
						<Table.Cell class="text-right">
							<Button variant="ghost" size="xs" onclick={() => selectHistory(h.id)}>
								Select
							</Button>
						</Table.Cell>
					</Table.Row>
				{:else}
					<Table.Row>
						<Table.Cell colspan={4} class="text-muted-foreground text-center">
							No history yet.
						</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
</div>
