<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import SparklesIcon from '@lucide/svelte/icons/sparkles';
	import ArrowLeftIcon from '@lucide/svelte/icons/arrow-left';

	let { title, description }: { title: string; description?: string } = $props();
</script>

<div class="mx-auto flex max-w-3xl flex-col items-center px-6 py-16 text-center sm:py-24">
	<div
		class="from-primary/15 to-primary/5 ring-primary/15 mb-6 inline-flex size-20 items-center justify-center rounded-2xl bg-gradient-to-br ring-1 ring-inset"
	>
		<SparklesIcon class="text-primary size-9" />
	</div>
	<h1 class="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
		{title}
	</h1>
	<p class="text-muted-foreground mt-3 max-w-xl text-base leading-relaxed">
		{description ?? 'This section is part of the full product but is not built out in the demo.'}
	</p>
	<div class="mt-2 mb-8">
		<span
			class="border-primary/20 bg-primary/5 text-primary inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium"
		>
			Coming soon
		</span>
	</div>
	<Button href="/clients" variant="outline">
		<ArrowLeftIcon /> Back to clients
	</Button>
</div>
