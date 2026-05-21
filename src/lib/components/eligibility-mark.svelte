<script lang="ts">
	import CheckCircleIcon from '@lucide/svelte/icons/check-circle';
	import XCircleIcon from '@lucide/svelte/icons/x-circle';
	import type { Eligibility } from '$lib/types';

	let { value }: { value: Eligibility } = $props();
</script>

{#if value === 'active'}
	<CheckCircleIcon class="size-5 text-emerald-600" aria-label="Eligible" />
{:else}
	<XCircleIcon class="size-5 text-red-600" aria-label="Not eligible" />
{/if}
