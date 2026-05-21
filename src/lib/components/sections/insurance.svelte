<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import * as Table from '$lib/components/ui/table/index.js';
	import { clientStore } from '$lib/state/clients.svelte';
	import { auth } from '$lib/state/auth.svelte';
	import { toast } from 'svelte-sonner';
	import UploadIcon from '@lucide/svelte/icons/upload';
	import Trash2Icon from '@lucide/svelte/icons/trash-2';
	import ExternalLinkIcon from '@lucide/svelte/icons/external-link';
	import type { Client, Insurance } from '$lib/types';

	let { client }: { client: Client } = $props();

	// svelte-ignore state_referenced_locally
	let draft = $state<Insurance>({ ...client.insurance });

	$effect(() => {
		draft = { ...client.insurance };
	});

	let chosenFileName = $state('');
	let fileInputRef = $state<HTMLInputElement | null>(null);

	function save() {
		const { documents: _docs, ...rest } = draft;
		clientStore.updateInsurance(client.id, rest);
		toast.success('Insurance saved');
	}

	function cancel() {
		draft = { ...client.insurance };
	}

	function onFileChosen(e: Event) {
		const target = e.target as HTMLInputElement;
		const f = target.files?.[0];
		chosenFileName = f ? f.name : '';
	}

	function upload() {
		if (!chosenFileName) {
			toast.error('Choose a file first');
			return;
		}
		clientStore.addDocument(client.id, {
			fileName: chosenFileName,
			staffName: auth.current?.displayName ?? 'Staff'
		});
		toast.success('Document uploaded');
		chosenFileName = '';
		if (fileInputRef) fileInputRef.value = '';
	}

	function deleteDoc(docId: string) {
		clientStore.deleteDocument(client.id, docId);
		toast.success('Document deleted');
	}
</script>

<div class="grid gap-4 p-4 md:grid-cols-2">
	<div class="space-y-3">
		<div class="grid gap-1.5">
			<Label for="ins-medi">Medi-Cal #</Label>
			<Input id="ins-medi" bind:value={draft.mediCalNumber} />
		</div>
		<div class="grid gap-1.5">
			<Label for="ins-hmo">HMO</Label>
			<Input id="ins-hmo" bind:value={draft.hmo} />
		</div>
		<div class="grid gap-1.5">
			<Label for="ins-elig">Eligibility</Label>
			<Input id="ins-elig" bind:value={draft.eligibility} />
		</div>
		<div class="grid gap-1.5">
			<Label for="ins-soc">Share of Cost (SOC)</Label>
			<Input id="ins-soc" bind:value={draft.shareOfCost} />
		</div>
		<div class="grid gap-1.5">
			<Label for="ins-verified">Date Eligibility Verified</Label>
			<Input id="ins-verified" placeholder="MM/DD/YYYY" bind:value={draft.dateEligibilityVerified} />
		</div>
		<div class="grid gap-1.5">
			<Label for="ins-medicare">Medicare #</Label>
			<Input id="ins-medicare" bind:value={draft.medicareNumber} />
		</div>

		<div class="flex gap-2 pt-2">
			<Button onclick={save}>Save</Button>
			<Button variant="outline" onclick={cancel}>Cancel</Button>
		</div>
	</div>

	<div class="rounded-lg border p-4">
		<div class="mb-3 flex items-center justify-between">
			<div>
				<h4 class="text-sm font-semibold">Eligibility Documents</h4>
				<p class="text-muted-foreground text-xs">Per-month verifications and proofs.</p>
			</div>
		</div>

		<div class="mb-3 flex items-center gap-2">
			<label
				class="border-input bg-background hover:bg-muted inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-lg border px-3 text-sm"
			>
				Choose file
				<input
					type="file"
					class="hidden"
					bind:this={fileInputRef}
					onchange={onFileChosen}
				/>
			</label>
			<span class="text-muted-foreground truncate text-xs">
				{chosenFileName || 'No file chosen'}
			</span>
			<Button size="sm" onclick={upload} class="ml-auto">
				<UploadIcon /> Upload
			</Button>
		</div>

		<Table.Root>
			<Table.Header>
				<Table.Row>
					<Table.Head>File Name</Table.Head>
					<Table.Head>Staff</Table.Head>
					<Table.Head>Upload Date</Table.Head>
					<Table.Head class="w-32 text-right">Actions</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each draft.documents as doc (doc.id)}
					<Table.Row>
						<Table.Cell class="font-mono text-xs">{doc.fileName}</Table.Cell>
						<Table.Cell>{doc.staffName}</Table.Cell>
						<Table.Cell>{doc.uploadDate}</Table.Cell>
						<Table.Cell class="text-right">
							<Button
								variant="ghost"
								size="xs"
								onclick={() => toast.info(`Open ${doc.fileName} (demo)`)}
							>
								<ExternalLinkIcon /> Open
							</Button>
							<Button variant="ghost" size="xs" onclick={() => deleteDoc(doc.id)}>
								<Trash2Icon /> Delete
							</Button>
						</Table.Cell>
					</Table.Row>
				{:else}
					<Table.Row>
						<Table.Cell colspan={4} class="text-muted-foreground text-center">
							No documents uploaded yet.
						</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
</div>
