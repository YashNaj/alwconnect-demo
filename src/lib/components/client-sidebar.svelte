<script lang="ts">
	import { page } from '$app/state';
	import { CLIENT_SIDEBAR } from '$lib/constants/nav';
	import { cn } from '$lib/utils';
	import UserIcon from '@lucide/svelte/icons/user';
	import type { Client } from '$lib/types';

	let { client }: { client: Client } = $props();

	function isActive(slug: string) {
		return page.url.pathname.endsWith(`/${slug}`);
	}
</script>

<aside class="w-56 shrink-0 space-y-4">
	<div class="border-border bg-card flex items-center gap-2 rounded-lg border p-3">
		<span class="bg-primary/10 text-primary inline-flex size-9 items-center justify-center rounded-full">
			<UserIcon class="size-4" />
		</span>
		<div class="leading-tight">
			<div class="text-foreground text-sm font-semibold uppercase">
				{client.personal.lastName || '—'}, {client.personal.firstName || '—'}
			</div>
			<div class="text-muted-foreground font-mono text-xs">MR#: {client.id}</div>
		</div>
	</div>

	<nav class="text-sm">
		{#each CLIENT_SIDEBAR as item, i (i)}
			{#if item.children}
				<div class="text-foreground mt-2 mb-1 font-semibold">{item.label}</div>
				<ul class="border-border ml-3 space-y-0.5 border-l pl-3">
					{#each item.children as child (child.href)}
						<li>
							<a
								href="/clients/{client.id}/{child.href}"
								class={cn(
									'block rounded px-2 py-1 transition-colors',
									isActive(child.href)
										? 'text-primary font-semibold'
										: 'text-muted-foreground hover:text-foreground'
								)}
							>
								{child.label}
							</a>
						</li>
					{/each}
				</ul>
			{:else}
				<a
					href="/clients/{client.id}/{item.href}"
					class={cn(
						'mt-0.5 block rounded px-2 py-1 transition-colors',
						isActive(item.href ?? '')
							? 'text-primary font-semibold'
							: 'text-muted-foreground hover:text-foreground'
					)}
				>
					{item.label}
				</a>
			{/if}
		{/each}
	</nav>
</aside>
