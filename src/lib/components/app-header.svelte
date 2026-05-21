<script lang="ts">
	import { goto } from '$app/navigation';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { BRAND } from '$lib/constants/brand';
	import { auth } from '$lib/state/auth.svelte';
	import HeartPulseIcon from '@lucide/svelte/icons/heart-pulse';
	import LogOutIcon from '@lucide/svelte/icons/log-out';
	import UserIcon from '@lucide/svelte/icons/user';
	import SettingsIcon from '@lucide/svelte/icons/settings';

	async function handleLogout() {
		auth.signOut();
		await goto('/login');
	}

	const initials = $derived(
		(auth.current?.displayName ?? '')
			.split(/\s+/)
			.map((p) => p.charAt(0))
			.slice(0, 2)
			.join('')
			.toUpperCase() || 'U'
	);
</script>

<header
	class="bg-card/80 border-border/60 sticky top-0 z-30 border-b backdrop-blur supports-[backdrop-filter]:bg-card/60"
>
	<div class="mx-auto flex h-16 max-w-[1400px] items-center gap-6 px-6">
		<a href="/clients" class="group flex items-center gap-2.5">
			<span
				class="from-primary to-primary/70 text-primary-foreground inline-flex size-9 items-center justify-center rounded-xl bg-gradient-to-br shadow-sm ring-1 ring-white/10"
			>
				<HeartPulseIcon class="size-5" />
			</span>
			<span class="flex flex-col leading-tight">
				<span class="text-foreground text-base font-bold tracking-tight sm:text-lg">
					{BRAND.name}
				</span>
				<span class="text-muted-foreground text-[10px] tracking-widest uppercase">
					{BRAND.company}
				</span>
			</span>
		</a>

		{#if auth.current}
			<div class="ml-auto">
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						{#snippet child({ props })}
							<button
								{...props}
								class="hover:bg-muted flex items-center gap-3 rounded-full p-1 pr-3 transition-colors"
							>
								<Avatar.Root class="size-9">
									<Avatar.Fallback
										class="from-primary to-primary/70 text-primary-foreground bg-gradient-to-br text-xs font-semibold"
									>
										{initials}
									</Avatar.Fallback>
								</Avatar.Root>
								<div class="hidden text-left leading-tight sm:block">
									<div class="text-foreground text-xs font-semibold">
										{auth.current?.displayName}
									</div>
									<div class="text-muted-foreground text-[11px]">
										{auth.current?.email}
									</div>
								</div>
							</button>
						{/snippet}
					</DropdownMenu.Trigger>
					<DropdownMenu.Content class="w-56" align="end">
						<DropdownMenu.Label>Signed in</DropdownMenu.Label>
						<DropdownMenu.Separator />
						<DropdownMenu.Item onclick={() => goto('/my-account')}>
							<UserIcon class="mr-2 size-4" /> My account
						</DropdownMenu.Item>
						<DropdownMenu.Item onclick={() => goto('/admin')}>
							<SettingsIcon class="mr-2 size-4" /> Admin
						</DropdownMenu.Item>
						<DropdownMenu.Separator />
						<DropdownMenu.Item onclick={handleLogout}>
							<LogOutIcon class="mr-2 size-4" /> Log out
						</DropdownMenu.Item>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</div>
		{:else}
			<Button href="/login" variant="ghost" class="ml-auto">Sign in</Button>
		{/if}
	</div>
</header>
