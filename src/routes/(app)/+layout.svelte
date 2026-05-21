<script lang="ts">
	import { goto } from '$app/navigation';
	import AppHeader from '$lib/components/app-header.svelte';
	import MainNav from '$lib/components/main-nav.svelte';
	import WelcomeDialog from '$lib/components/welcome-dialog.svelte';
	import { auth } from '$lib/state/auth.svelte';

	let { children } = $props();

	$effect(() => {
		if (!auth.isAuthed) {
			goto('/login', { replaceState: true });
		}
	});
</script>

{#if auth.isAuthed}
	<div class="from-background to-muted/40 min-h-screen bg-gradient-to-b">
		<AppHeader />
		<MainNav />
		<main>
			{@render children()}
		</main>
		<WelcomeDialog />
	</div>
{/if}
