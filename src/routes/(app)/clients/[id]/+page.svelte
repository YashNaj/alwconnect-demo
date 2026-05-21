<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(() => {
		goto(`/clients/${page.params.id}/demographics`, { replaceState: true });
	});
</script>
