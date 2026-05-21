<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { auth } from '$lib/state/auth.svelte';

	onMount(() => {
		goto(auth.isAuthed ? '/clients' : '/login', { replaceState: true });
	});
</script>
