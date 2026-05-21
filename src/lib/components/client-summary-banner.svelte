<script lang="ts">
	import StatusBadge from '$lib/components/status-badge.svelte';
	import EligibilityMark from '$lib/components/eligibility-mark.svelte';
	import type { Client } from '$lib/types';

	let { client }: { client: Client } = $props();

	const fullName = $derived(`${client.personal.lastName}, ${client.personal.firstName}`);
</script>

<section class="bg-primary/5 border-primary/20 border-y px-6 py-3">
	<div class="mx-auto grid max-w-[1400px] gap-x-6 gap-y-1 text-xs sm:grid-cols-2 lg:grid-cols-4">
		<dl class="space-y-0.5">
			<div class="flex gap-2">
				<dt class="text-muted-foreground font-semibold">Name:</dt>
				<dd>{fullName || '—'}</dd>
			</div>
			<div class="flex gap-2">
				<dt class="text-muted-foreground font-semibold">MR#:</dt>
				<dd class="font-mono">{client.id}</dd>
			</div>
			<div class="flex gap-2">
				<dt class="text-muted-foreground font-semibold">Medi-Cal #:</dt>
				<dd class="font-mono">{client.insurance.mediCalNumber || '—'}</dd>
			</div>
			<div class="flex gap-2">
				<dt class="text-muted-foreground font-semibold">DOB:</dt>
				<dd>{client.personal.dob || '—'}</dd>
			</div>
		</dl>
		<dl class="space-y-0.5">
			<div class="flex gap-2">
				<dt class="text-muted-foreground font-semibold">Gender:</dt>
				<dd>{client.personal.gender || '—'}</dd>
			</div>
			<div class="flex gap-2">
				<dt class="text-muted-foreground font-semibold">Tier:</dt>
				<dd>{client.tier}</dd>
			</div>
			<div class="flex gap-2">
				<dt class="text-muted-foreground font-semibold">Habilitation:</dt>
				<dd>{client.habilitation ? 'YES' : 'NO'}</dd>
			</div>
			<div class="flex gap-2">
				<dt class="text-muted-foreground font-semibold">Assisted Living:</dt>
				<dd>{client.assistedLiving || '—'}</dd>
			</div>
		</dl>
		<dl class="space-y-0.5">
			<div class="flex gap-2">
				<dt class="text-muted-foreground font-semibold">Waitlist Date:</dt>
				<dd>{client.serviceDates.waitlistDate || '—'}</dd>
			</div>
			<div class="flex gap-2">
				<dt class="text-muted-foreground font-semibold">Waitlist Release Date:</dt>
				<dd>{client.serviceDates.waitlistReleaseDate || '—'}</dd>
			</div>
			<div class="flex gap-2">
				<dt class="text-muted-foreground font-semibold">Enrollment Date:</dt>
				<dd>{client.serviceDates.enrollmentDate || '—'}</dd>
			</div>
			<div class="flex gap-2">
				<dt class="text-muted-foreground font-semibold">Dis-Enrollment Date:</dt>
				<dd>{client.serviceDates.disenrollmentDate || '—'}</dd>
			</div>
		</dl>
		<dl class="space-y-0.5">
			<div class="flex items-center gap-2">
				<dt class="text-muted-foreground font-semibold">Status:</dt>
				<dd><StatusBadge status={client.serviceDates.status} /></dd>
			</div>
			<div class="flex items-center gap-2">
				<dt class="text-muted-foreground font-semibold">Eligibility:</dt>
				<dd class="flex items-center gap-1">
					<EligibilityMark value={client.eligibility} />
					<span>{client.insurance.eligibility || (client.eligibility === 'active' ? 'Eligible' : 'Not eligible')}</span>
				</dd>
			</div>
			<div class="flex gap-2">
				<dt class="text-muted-foreground font-semibold">Transfer:</dt>
				<dd>{client.serviceDates.transfer}</dd>
			</div>
			<div class="flex gap-2">
				<dt class="text-muted-foreground font-semibold">Re-Enrollment:</dt>
				<dd>{client.serviceDates.reEnrollment}</dd>
			</div>
		</dl>
	</div>
</section>
