<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import ClientSummaryBanner from '$lib/components/client-summary-banner.svelte';
	import ClientSidebar from '$lib/components/client-sidebar.svelte';
	import { clientStore } from '$lib/state/clients.svelte';

	let { children } = $props();

	const client = $derived(clientStore.byId(page.params.id ?? ''));

	$effect(() => {
		if (!client) {
			goto('/clients', { replaceState: true });
		}
	});
</script>

{#if client}
	<ClientSummaryBanner {client} />
	<div class="mx-auto flex max-w-[1400px] gap-6 px-6 py-6">
		<ClientSidebar {client} />
		<div class="min-w-0 grow">
			{@render children()}
		</div>
	</div>
{/if}
