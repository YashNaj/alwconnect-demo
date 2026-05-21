<script lang="ts">
	import { page } from '$app/state';
	import { TOP_NAV } from '$lib/constants/nav';
	import { cn } from '$lib/utils';

	function isActive(href: string) {
		if (href === '/clients') return page.url.pathname.startsWith('/clients');
		return page.url.pathname === href || page.url.pathname.startsWith(href + '/');
	}
</script>

<nav class="border-border/60 bg-card/60 sticky top-16 z-20 border-b backdrop-blur">
	<div class="mx-auto flex h-12 max-w-[1400px] items-center gap-1 overflow-x-auto px-4">
		{#each TOP_NAV as item (item.href)}
			{@const active = isActive(item.href)}
			<a
				href={item.href}
				class={cn(
					'inline-flex h-9 items-center rounded-full px-4 text-sm font-medium whitespace-nowrap transition-all',
					active
						? 'bg-primary text-primary-foreground shadow-sm'
						: 'text-muted-foreground hover:bg-muted hover:text-foreground'
				)}
			>
				{item.label}
			</a>
		{/each}
	</div>
</nav>
