<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { BRAND } from '$lib/constants/brand';
	import { auth } from '$lib/state/auth.svelte';
	import HeartIcon from '@lucide/svelte/icons/heart';
	import SparklesIcon from '@lucide/svelte/icons/sparkles';

	let open = $state(false);

	$effect(() => {
		if (auth.hasPendingWelcome) {
			open = true;
			auth.consumeWelcome();
		}
	});
</script>

<Dialog.Root bind:open>
	<Dialog.Content class="sm:max-w-md">
		<Dialog.Header>
			<div class="bg-muted mb-2 inline-flex size-12 items-center justify-center rounded-full">
				<HeartIcon class="size-6 fill-rose-500 text-rose-500" />
			</div>
			<Dialog.Title class="text-xl font-bold tracking-tight">
				Welcome back, {auth.current?.greeting ?? BRAND.defaultGreeting}
				<HeartIcon class="ml-1 inline-block size-4 fill-rose-500 text-rose-500" />
			</Dialog.Title>
			<Dialog.Description>
				So glad to have you in the demo. Take a look around, poke at the data — nothing is real,
				everything is reversible.
			</Dialog.Description>
		</Dialog.Header>
		<ul class="text-muted-foreground space-y-2 text-sm">
			<li class="flex items-start gap-2">
				<SparklesIcon class="text-primary mt-0.5 size-4 shrink-0" />
				Open any client from the list to walk through the full profile.
			</li>
			<li class="flex items-start gap-2">
				<SparklesIcon class="text-primary mt-0.5 size-4 shrink-0" />
				Save / Update / Delete buttons mutate an in-memory store — refresh to reset.
			</li>
			<li class="flex items-start gap-2">
				<SparklesIcon class="text-primary mt-0.5 size-4 shrink-0" />
				Greyed-out sidebar items show the planned scope of the real product.
			</li>
		</ul>
		<Dialog.Footer>
			<Button class="w-full sm:w-auto" onclick={() => (open = false)}>Let's go</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
