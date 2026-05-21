<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Table from '$lib/components/ui/table/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import StatusBadge from '$lib/components/status-badge.svelte';
	import EligibilityMark from '$lib/components/eligibility-mark.svelte';
	import ArrowUpDownIcon from '@lucide/svelte/icons/arrow-up-down';
	import ArrowDownIcon from '@lucide/svelte/icons/arrow-down';
	import ArrowUpIcon from '@lucide/svelte/icons/arrow-up';
	import PrinterIcon from '@lucide/svelte/icons/printer';
	import PlusIcon from '@lucide/svelte/icons/plus';
	import { clientStore } from '$lib/state/clients.svelte';
	import { STATUS_OPTIONS } from '$lib/constants/options';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';
	import type { Client, ClientStatus } from '$lib/types';

	type SortKey =
		| 'id'
		| 'lastName'
		| 'firstName'
		| 'dob'
		| 'gender'
		| 'tier'
		| 'habilitation'
		| 'assistedLiving'
		| 'waitlistDate'
		| 'waitlistReleaseDate'
		| 'enrollmentDate'
		| 'disenrollmentDate'
		| 'status'
		| 'eligibility';

	let searchTerm = $state('');
	let statusFilter = $state<ClientStatus | 'ALL'>('ALL');
	let nameFilter = $state('');
	let fromDate = $state('');
	let toDate = $state('');
	let appliedFromDate = $state('');
	let appliedToDate = $state('');

	let sortKey = $state<SortKey>('id');
	let sortDir = $state<'asc' | 'desc'>('asc');

	let createOpen = $state(false);
	let newFirst = $state('');
	let newLast = $state('');
	let newDob = $state('');

	function parseDate(d: string) {
		// MM/DD/YYYY
		const parts = d.split('/');
		if (parts.length !== 3) return 0;
		const [m, day, y] = parts.map(Number);
		return new Date(y, m - 1, day).getTime();
	}

	function cellValue(c: Client, key: SortKey): string | number {
		switch (key) {
			case 'id':
				return c.id;
			case 'lastName':
				return c.personal.lastName;
			case 'firstName':
				return c.personal.firstName;
			case 'dob':
				return parseDate(c.personal.dob);
			case 'gender':
				return c.personal.gender;
			case 'tier':
				return c.tier;
			case 'habilitation':
				return c.habilitation ? 1 : 0;
			case 'assistedLiving':
				return c.assistedLiving;
			case 'waitlistDate':
				return parseDate(c.serviceDates.waitlistDate);
			case 'waitlistReleaseDate':
				return parseDate(c.serviceDates.waitlistReleaseDate);
			case 'enrollmentDate':
				return parseDate(c.serviceDates.enrollmentDate);
			case 'disenrollmentDate':
				return parseDate(c.serviceDates.disenrollmentDate);
			case 'status':
				return c.serviceDates.status;
			case 'eligibility':
				return c.eligibility;
		}
	}

	function toggleSort(key: SortKey) {
		if (sortKey === key) {
			sortDir = sortDir === 'asc' ? 'desc' : 'asc';
		} else {
			sortKey = key;
			sortDir = 'asc';
		}
	}

	const filtered = $derived.by(() => {
		const term = searchTerm.trim().toLowerCase();
		const name = nameFilter.trim().toLowerCase();
		const from = appliedFromDate ? parseDate(appliedFromDate) : 0;
		const to = appliedToDate ? parseDate(appliedToDate) : 0;

		return clientStore.all.filter((c) => {
			if (term) {
				const blob =
					`${c.id} ${c.personal.firstName} ${c.personal.lastName} ${c.assistedLiving}`.toLowerCase();
				if (!blob.includes(term)) return false;
			}
			if (statusFilter !== 'ALL' && c.serviceDates.status !== statusFilter) return false;
			if (name) {
				const fullName = `${c.personal.lastName}, ${c.personal.firstName}`.toLowerCase();
				if (!fullName.includes(name)) return false;
			}
			if (from || to) {
				const d = parseDate(c.serviceDates.waitlistDate || c.serviceDates.enrollmentDate);
				if (from && d && d < from) return false;
				if (to && d && d > to) return false;
			}
			return true;
		});
	});

	const sorted = $derived.by(() => {
		const copy = [...filtered];
		copy.sort((a, b) => {
			const av = cellValue(a, sortKey);
			const bv = cellValue(b, sortKey);
			if (av === bv) return 0;
			const cmp = av > bv ? 1 : -1;
			return sortDir === 'asc' ? cmp : -cmp;
		});
		return copy;
	});

	function applyFilters() {
		appliedFromDate = fromDate;
		appliedToDate = toDate;
	}

	function statusLabel(value: typeof statusFilter): string {
		if (value === 'ALL') return 'ALL';
		return STATUS_OPTIONS.find((o) => o.value === value)?.label ?? value;
	}

	function handleCreate() {
		if (!newFirst.trim() || !newLast.trim()) {
			toast.error('First and last name are required.');
			return;
		}
		const c = clientStore.create({
			firstName: newFirst.trim(),
			lastName: newLast.trim(),
			dob: newDob.trim()
		});
		toast.success(`Created client ${c.id}`);
		createOpen = false;
		newFirst = '';
		newLast = '';
		newDob = '';
		goto(`/clients/${c.id}/demographics`);
	}

	function sortIcon(key: SortKey) {
		if (sortKey !== key) return ArrowUpDownIcon;
		return sortDir === 'asc' ? ArrowUpIcon : ArrowDownIcon;
	}
</script>

<svelte:head>
	<title>Client List — CareCoordination Connex</title>
</svelte:head>

<div class="mx-auto max-w-[1400px] space-y-4 p-6">
	<div class="flex flex-wrap items-end gap-3">
		<div class="grow">
			<Label for="search" class="text-xs text-muted-foreground">Search Client</Label>
			<Input
				id="search"
				class="max-w-sm"
				placeholder="Search by name, MR#, or facility"
				bind:value={searchTerm}
			/>
		</div>
		<div class="hidden text-xs text-muted-foreground italic md:block">
			Notes: Sortable by Column. Exportable as Printer Friendly PDF
		</div>
		<Dialog.Root bind:open={createOpen}>
			<Dialog.Trigger>
				{#snippet child({ props })}
					<Button {...props}>
						<PlusIcon /> Create a New Client
					</Button>
				{/snippet}
			</Dialog.Trigger>
			<Dialog.Content class="sm:max-w-md">
				<Dialog.Header>
					<Dialog.Title>Create a New Client</Dialog.Title>
					<Dialog.Description>
						A new MR# will be generated automatically. You can fill in the rest on the profile page.
					</Dialog.Description>
				</Dialog.Header>
				<div class="grid gap-3">
					<div class="grid gap-1.5">
						<Label for="new-first">First name</Label>
						<Input id="new-first" bind:value={newFirst} />
					</div>
					<div class="grid gap-1.5">
						<Label for="new-last">Last name</Label>
						<Input id="new-last" bind:value={newLast} />
					</div>
					<div class="grid gap-1.5">
						<Label for="new-dob">Date of birth (MM/DD/YYYY)</Label>
						<Input id="new-dob" placeholder="01/01/1990" bind:value={newDob} />
					</div>
				</div>
				<Dialog.Footer>
					<Button variant="outline" onclick={() => (createOpen = false)}>Cancel</Button>
					<Button onclick={handleCreate}>Create</Button>
				</Dialog.Footer>
			</Dialog.Content>
		</Dialog.Root>
	</div>

	<Card.Root>
		<Card.Header>
			<Card.Title>Client List</Card.Title>
		</Card.Header>
		<Card.Content class="space-y-4">
			<div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-6 lg:items-end">
				<div class="grid gap-1.5">
					<Label class="text-xs text-muted-foreground">Status</Label>
					<Select.Root type="single" bind:value={statusFilter as string}>
						<Select.Trigger class="w-full">{statusLabel(statusFilter)}</Select.Trigger>
						<Select.Content>
							<Select.Item value="ALL" label="ALL">ALL</Select.Item>
							{#each STATUS_OPTIONS as opt (opt.value)}
								<Select.Item value={opt.value} label={opt.label}>{opt.label}</Select.Item>
							{/each}
						</Select.Content>
					</Select.Root>
				</div>
				<div class="grid gap-1.5">
					<Label for="name-filter" class="text-xs text-muted-foreground">Name</Label>
					<Input id="name-filter" placeholder="Last, First" bind:value={nameFilter} />
				</div>
				<div class="grid gap-1.5">
					<Label for="from-date" class="text-xs text-muted-foreground">From Date</Label>
					<Input id="from-date" placeholder="MM/DD/YYYY" bind:value={fromDate} />
				</div>
				<div class="grid gap-1.5">
					<Label for="to-date" class="text-xs text-muted-foreground">To Date</Label>
					<Input id="to-date" placeholder="MM/DD/YYYY" bind:value={toDate} />
				</div>
				<Button onclick={applyFilters}>Submit</Button>
				<Button variant="outline" onclick={() => window.print()}>
					<PrinterIcon /> Print
				</Button>
			</div>

			<div class="rounded-lg border">
				<Table.Root>
					<Table.Header>
						<Table.Row>
							<Table.Head class="w-16"></Table.Head>
							{@const cols = [
								{ key: 'id' as SortKey, label: 'MR#' },
								{ key: 'lastName' as SortKey, label: 'Last Name' },
								{ key: 'firstName' as SortKey, label: 'First Name' },
								{ key: 'dob' as SortKey, label: 'DOB' },
								{ key: 'gender' as SortKey, label: 'Gender' },
								{ key: 'tier' as SortKey, label: 'Tier' },
								{ key: 'habilitation' as SortKey, label: 'Habilitation' },
								{ key: 'assistedLiving' as SortKey, label: 'Assisted Living' },
								{ key: 'waitlistDate' as SortKey, label: 'Waitlist Date' },
								{ key: 'waitlistReleaseDate' as SortKey, label: 'Waitlist Release Date' },
								{ key: 'enrollmentDate' as SortKey, label: 'Enrollment Date' },
								{ key: 'disenrollmentDate' as SortKey, label: 'Dis-Enrollment Date' },
								{ key: 'status' as SortKey, label: 'Status' },
								{ key: 'eligibility' as SortKey, label: 'Eligibility' }
							]}
							{#each cols as col (col.key)}
								{@const SortIcon = sortIcon(col.key)}
								<Table.Head>
									<button
										type="button"
										class="inline-flex items-center gap-1 text-xs font-semibold hover:text-foreground"
										onclick={() => toggleSort(col.key)}
									>
										{col.label}
										<SortIcon class="size-3" />
									</button>
								</Table.Head>
							{/each}
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{#each sorted as c (c.id)}
							<Table.Row>
								<Table.Cell>
									<Button variant="secondary" size="xs" href="/clients/{c.id}/demographics">
										Open
									</Button>
								</Table.Cell>
								<Table.Cell class="font-mono text-xs">{c.id}</Table.Cell>
								<Table.Cell>{c.personal.lastName}</Table.Cell>
								<Table.Cell>{c.personal.firstName}</Table.Cell>
								<Table.Cell>{c.personal.dob}</Table.Cell>
								<Table.Cell>{c.personal.gender}</Table.Cell>
								<Table.Cell>{c.tier}</Table.Cell>
								<Table.Cell>{c.habilitation ? 'YES' : 'NO'}</Table.Cell>
								<Table.Cell>{c.assistedLiving}</Table.Cell>
								<Table.Cell>{c.serviceDates.waitlistDate}</Table.Cell>
								<Table.Cell>{c.serviceDates.waitlistReleaseDate}</Table.Cell>
								<Table.Cell>{c.serviceDates.enrollmentDate}</Table.Cell>
								<Table.Cell>{c.serviceDates.disenrollmentDate}</Table.Cell>
								<Table.Cell><StatusBadge status={c.serviceDates.status} /></Table.Cell>
								<Table.Cell><EligibilityMark value={c.eligibility} /></Table.Cell>
							</Table.Row>
						{:else}
							<Table.Row>
								<Table.Cell colspan={15} class="text-muted-foreground text-center">
									No clients match your filters.
								</Table.Cell>
							</Table.Row>
						{/each}
					</Table.Body>
				</Table.Root>
			</div>
		</Card.Content>
	</Card.Root>
</div>
