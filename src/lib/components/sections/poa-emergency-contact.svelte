<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import * as Table from '$lib/components/ui/table/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { CONTACT_RELATIONSHIP_OPTIONS } from '$lib/constants/options';
	import { clientStore } from '$lib/state/clients.svelte';
	import { toast } from 'svelte-sonner';
	import type { Client, EmergencyContact } from '$lib/types';

	let { client }: { client: Client } = $props();

	const blank = (): Omit<EmergencyContact, 'id'> => ({
		lastName: '',
		firstName: '',
		phone: '',
		email: '',
		contactIs: '',
		clientIs: '',
		poa: ''
	});

	let draft = $state<Omit<EmergencyContact, 'id'>>(blank());
	let editingId = $state<string | null>(null);

	function loadInto(c: EmergencyContact) {
		const { id, ...rest } = c;
		editingId = id;
		draft = rest;
	}

	function addNew() {
		if (!draft.firstName.trim() && !draft.lastName.trim()) {
			toast.error('Add a name first');
			return;
		}
		clientStore.addContact(client.id, draft);
		toast.success('Contact added');
		draft = blank();
		editingId = null;
	}

	function updateContact() {
		if (!editingId) {
			addNew();
			return;
		}
		clientStore.updateContact(client.id, editingId, draft);
		toast.success('Contact updated');
	}

	function deleteContact() {
		if (!editingId) return;
		clientStore.deleteContact(client.id, editingId);
		toast.success('Contact deleted');
		draft = blank();
		editingId = null;
	}

	function setAsMain() {
		if (!editingId) {
			toast.error('Select an existing contact first');
			return;
		}
		clientStore.setMainContact(client.id, editingId);
		toast.success('Set as main contact');
	}

	const labelFor = (opts: { value: string; label: string }[], v: string) =>
		opts.find((o) => o.value === v)?.label ?? '';
</script>

<div class="grid gap-4 p-4 lg:grid-cols-[1fr_1fr]">
	<div class="space-y-3">
		<div class="grid grid-cols-2 gap-2">
			<div class="grid gap-1.5">
				<Label for="ec-last">Last Name</Label>
				<Input id="ec-last" bind:value={draft.lastName} />
			</div>
			<div class="grid gap-1.5">
				<Label for="ec-first">First Name</Label>
				<Input id="ec-first" bind:value={draft.firstName} />
			</div>
		</div>
		<div class="grid gap-1.5">
			<Label for="ec-phone">Phone</Label>
			<Input id="ec-phone" type="tel" bind:value={draft.phone} />
		</div>
		<div class="grid gap-1.5">
			<Label for="ec-email">Email</Label>
			<Input id="ec-email" type="email" bind:value={draft.email} />
		</div>

		<div class="grid gap-1.5">
			<Label for="ec-contact-is">Contact is</Label>
			<Select.Root type="single" bind:value={draft.contactIs as string}>
				<Select.Trigger id="ec-contact-is" class="w-full">
					{labelFor(CONTACT_RELATIONSHIP_OPTIONS, draft.contactIs) || 'Select…'}
				</Select.Trigger>
				<Select.Content>
					{#each CONTACT_RELATIONSHIP_OPTIONS as opt (opt.value)}
						<Select.Item value={opt.value} label={opt.label}>{opt.label}</Select.Item>
					{/each}
				</Select.Content>
			</Select.Root>
		</div>

		<div class="grid gap-1.5">
			<Label for="ec-client-is">Client is</Label>
			<Select.Root type="single" bind:value={draft.clientIs as string}>
				<Select.Trigger id="ec-client-is" class="w-full">
					{labelFor(CONTACT_RELATIONSHIP_OPTIONS, draft.clientIs) || 'Select…'}
				</Select.Trigger>
				<Select.Content>
					{#each CONTACT_RELATIONSHIP_OPTIONS as opt (opt.value)}
						<Select.Item value={opt.value} label={opt.label}>{opt.label}</Select.Item>
					{/each}
				</Select.Content>
			</Select.Root>
		</div>

		<div class="grid gap-1.5">
			<Label for="ec-poa">POA</Label>
			<Select.Root type="single" bind:value={draft.poa as string}>
				<Select.Trigger id="ec-poa" class="w-full">{draft.poa || 'Select…'}</Select.Trigger>
				<Select.Content>
					<Select.Item value="Yes" label="Yes">Yes</Select.Item>
					<Select.Item value="No" label="No">No</Select.Item>
				</Select.Content>
			</Select.Root>
		</div>

		<div class="flex flex-wrap gap-2 pt-2">
			<Button onclick={setAsMain} variant="secondary">Set as Main</Button>
			<Button onclick={updateContact}>{editingId ? 'Update Contact' : 'Add Contact'}</Button>
			{#if editingId}
				<Button variant="destructive" onclick={deleteContact}>Delete Contact</Button>
			{/if}
			<Button
				variant="outline"
				onclick={() => {
					draft = blank();
					editingId = null;
				}}
			>
				New
			</Button>
		</div>
	</div>

	<div class="rounded-lg border p-4">
		<h4 class="mb-2 text-sm font-semibold">Emergency Contacts</h4>
		<Table.Root>
			<Table.Header>
				<Table.Row>
					<Table.Head>Name</Table.Head>
					<Table.Head>Phone</Table.Head>
					<Table.Head>Email</Table.Head>
					<Table.Head class="w-32 text-right"></Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each client.contacts.emergency as c (c.id)}
					<Table.Row>
						<Table.Cell>
							{c.firstName} {c.lastName}
							{#if client.contacts.mainContactId === c.id}
								<Badge variant="secondary" class="ml-1">Main</Badge>
							{/if}
						</Table.Cell>
						<Table.Cell>{c.phone}</Table.Cell>
						<Table.Cell class="text-xs">{c.email}</Table.Cell>
						<Table.Cell class="text-right">
							<Button variant="ghost" size="xs" onclick={() => loadInto(c)}>Select</Button>
						</Table.Cell>
					</Table.Row>
				{:else}
					<Table.Row>
						<Table.Cell colspan={4} class="text-muted-foreground text-center">
							No emergency contacts yet.
						</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
</div>
