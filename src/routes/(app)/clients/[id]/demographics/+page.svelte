<script lang="ts">
	import { page } from '$app/state';
	import * as Accordion from '$lib/components/ui/accordion/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { clientStore } from '$lib/state/clients.svelte';
	import PersonalInformation from '$lib/components/sections/personal-information.svelte';
	import Insurance from '$lib/components/sections/insurance.svelte';
	import ServiceDates from '$lib/components/sections/service-dates.svelte';
	import PlaceOfService from '$lib/components/sections/place-of-service.svelte';
	import PoaEmergencyContact from '$lib/components/sections/poa-emergency-contact.svelte';
	import ReferralSource from '$lib/components/sections/referral-source.svelte';

	const client = $derived(clientStore.byId(page.params.id ?? ''));

	let openSections = $state<string[]>(['personal']);
</script>

{#if client}
	<Card.Root>
		<Card.Header>
			<Card.Title>Demographics</Card.Title>
			<Card.Description>
				Open each section to view or update. Changes save to the in-memory demo store.
			</Card.Description>
		</Card.Header>
		<Card.Content>
			<Accordion.Root type="multiple" bind:value={openSections} class="w-full">
				<Accordion.Item value="personal" class="border-border rounded-lg border mb-2 last:mb-0">
					<Accordion.Trigger class="bg-muted/40 hover:bg-muted px-4">
						Personal Information
					</Accordion.Trigger>
					<Accordion.Content>
						<PersonalInformation {client} />
					</Accordion.Content>
				</Accordion.Item>

				<Accordion.Item value="insurance" class="border-border rounded-lg border mb-2 last:mb-0">
					<Accordion.Trigger class="bg-muted/40 hover:bg-muted px-4">
						Insurance
					</Accordion.Trigger>
					<Accordion.Content>
						<Insurance {client} />
					</Accordion.Content>
				</Accordion.Item>

				<Accordion.Item value="service-dates" class="border-border rounded-lg border mb-2 last:mb-0">
					<Accordion.Trigger class="bg-muted/40 hover:bg-muted px-4">
						Service Dates
					</Accordion.Trigger>
					<Accordion.Content>
						<ServiceDates {client} />
					</Accordion.Content>
				</Accordion.Item>

				<Accordion.Item value="pos" class="border-border rounded-lg border mb-2 last:mb-0">
					<Accordion.Trigger class="bg-muted/40 hover:bg-muted px-4">
						Place of Service (POS)
					</Accordion.Trigger>
					<Accordion.Content>
						<PlaceOfService {client} />
					</Accordion.Content>
				</Accordion.Item>

				<Accordion.Item value="poa" class="border-border rounded-lg border mb-2 last:mb-0">
					<Accordion.Trigger class="bg-muted/40 hover:bg-muted px-4">
						Power of Attorney (POA) / Emergency Contact (EC)
					</Accordion.Trigger>
					<Accordion.Content>
						<PoaEmergencyContact {client} />
					</Accordion.Content>
				</Accordion.Item>

				<Accordion.Item value="referral" class="border-border rounded-lg border mb-2 last:mb-0">
					<Accordion.Trigger class="bg-muted/40 hover:bg-muted px-4">
						Referral Source
					</Accordion.Trigger>
					<Accordion.Content>
						<ReferralSource {client} />
					</Accordion.Content>
				</Accordion.Item>
			</Accordion.Root>
		</Card.Content>
	</Card.Root>
{/if}
