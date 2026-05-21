<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { BRAND } from '$lib/constants/brand';
	import { auth } from '$lib/state/auth.svelte';
	import HeartPulseIcon from '@lucide/svelte/icons/heart-pulse';
	import ShieldCheckIcon from '@lucide/svelte/icons/shield-check';
	import UsersIcon from '@lucide/svelte/icons/users';
	import ClipboardListIcon from '@lucide/svelte/icons/clipboard-list';

	let email = $state('');
	let password = $state('');

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		if (!email.trim() || !password) return;
		auth.signIn(email);
		await goto('/clients');
	}
</script>

<svelte:head>
	<title>{BRAND.name} — Sign in</title>
</svelte:head>

<div class="grid min-h-screen lg:grid-cols-2">
	<!-- Branded panel -->
	<aside
		class="from-primary via-primary to-primary/70 relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br p-12 text-white lg:flex"
	>
		<div
			class="pointer-events-none absolute -top-32 -right-32 size-96 rounded-full bg-white/10 blur-3xl"
		></div>
		<div
			class="pointer-events-none absolute -bottom-40 -left-32 size-[28rem] rounded-full bg-cyan-300/20 blur-3xl"
		></div>

		<div class="relative flex items-center gap-3">
			<span class="inline-flex size-11 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/30">
				<HeartPulseIcon class="size-6" />
			</span>
			<div class="leading-tight">
				<div class="text-lg font-bold tracking-tight">{BRAND.name}</div>
				<div class="text-xs tracking-widest text-white/70 uppercase">{BRAND.company}</div>
			</div>
		</div>

		<div class="relative max-w-md space-y-6">
			<h2 class="text-4xl font-bold leading-tight tracking-tight xl:text-5xl">
				Care coordination that keeps every client moving forward.
			</h2>
			<p class="text-base leading-relaxed text-white/80">
				Demographics, eligibility, place of service, and contacts — one record per client, every
				stage of intake to disenrollment in view.
			</p>

			<ul class="space-y-3 pt-4">
				<li class="flex items-start gap-3">
					<span class="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-white/15 ring-1 ring-white/20">
						<UsersIcon class="size-4" />
					</span>
					<div>
						<div class="text-sm font-semibold">One roster, every stage</div>
						<div class="text-xs text-white/70">Filter and sort waitlisted, enrolled, and disenrolled clients in seconds.</div>
					</div>
				</li>
				<li class="flex items-start gap-3">
					<span class="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-white/15 ring-1 ring-white/20">
						<ClipboardListIcon class="size-4" />
					</span>
					<div>
						<div class="text-sm font-semibold">Profile completeness at a glance</div>
						<div class="text-xs text-white/70">Personal, insurance, service dates, POS, contacts — all in one accordion.</div>
					</div>
				</li>
				<li class="flex items-start gap-3">
					<span class="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-white/15 ring-1 ring-white/20">
						<ShieldCheckIcon class="size-4" />
					</span>
					<div>
						<div class="text-sm font-semibold">Eligibility documents alongside</div>
						<div class="text-xs text-white/70">Upload monthly verifications and never lose track of the paper trail.</div>
					</div>
				</li>
			</ul>
		</div>

		<div class="relative text-xs text-white/60">
			Demo build · No real PHI · Reset on page refresh
		</div>
	</aside>

	<!-- Form panel -->
	<main class="bg-background relative flex items-center justify-center p-6 sm:p-12">
		<div class="w-full max-w-md">
			<div class="mb-10 flex items-center gap-2 lg:hidden">
				<span class="bg-primary text-primary-foreground inline-flex size-10 items-center justify-center rounded-xl">
					<HeartPulseIcon class="size-5" />
				</span>
				<div class="leading-tight">
					<div class="text-base font-bold tracking-tight">{BRAND.name}</div>
					<div class="text-muted-foreground text-[10px] tracking-widest uppercase">{BRAND.company}</div>
				</div>
			</div>

			<div class="space-y-2">
				<h1 class="text-3xl font-bold tracking-tight sm:text-4xl">Sign in</h1>
				<p class="text-muted-foreground text-sm">
					Welcome back. Use any email and password — this is a demo.
				</p>
			</div>

			<form onsubmit={handleSubmit} class="mt-8 space-y-5">
				<div class="space-y-2">
					<Label for="email">Email</Label>
					<Input
						id="email"
						name="email"
						type="email"
						autocomplete="username"
						placeholder="you@example.com"
						required
						bind:value={email}
						class="h-11 text-base"
					/>
				</div>

				<div class="space-y-2">
					<div class="flex items-center justify-between">
						<Label for="password">Password</Label>
						<button
							type="button"
							class="text-muted-foreground hover:text-foreground text-xs"
							onclick={() => {}}
						>
							Forgot password?
						</button>
					</div>
					<Input
						id="password"
						name="password"
						type="password"
						autocomplete="current-password"
						placeholder="••••••••"
						required
						bind:value={password}
						class="h-11 text-base"
					/>
				</div>

				<Button type="submit" class="h-11 w-full text-base font-semibold">
					Sign in
				</Button>
			</form>

			<p class="text-muted-foreground mt-8 text-center text-xs">
				By signing in you agree to be wowed by a static demo.
			</p>
		</div>
	</main>
</div>
