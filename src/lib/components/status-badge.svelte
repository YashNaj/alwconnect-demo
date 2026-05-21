<script lang="ts">
	import { Badge } from '$lib/components/ui/badge/index.js';
	import type { ClientStatus } from '$lib/types';

	let { status }: { status: ClientStatus } = $props();

	const tone: Record<ClientStatus, 'default' | 'secondary' | 'destructive' | 'outline'> = {
		ENROLLED: 'default',
		WAITLISTED: 'secondary',
		DISENROLLED: 'destructive',
		PENDING: 'outline',
		TRANSFERRED: 'outline'
	};
</script>

<Badge variant={tone[status]}>{status}</Badge>
