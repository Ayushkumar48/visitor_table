<script lang="ts">
	import DataTable from '$lib/components/custom/data-table/data-table.svelte';
	import { columns } from '$lib/components/custom/data-table/columns';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import type { VisitorEntry } from '$lib/components/custom/data-table/columns';
	import { toast } from 'svelte-sonner';

	let allVisitors = $state<VisitorEntry[]>([]);
	let searchQuery = $state('');

	async function getVisitors() {
		toast.promise(
			async () => {
				const res = await fetch(`/visitors/search?q=${searchQuery}`);
				if (!res.ok) {
					throw new Error(`HTTP error! status: ${res.status}`);
				}
				const data = await res.json();
				allVisitors = data.allVisitors;
				return 'Visitors loaded successfully!';
			},
			{
				loading: 'Searching for visitors...',
				success: (message) => message,
				error: 'Failed to load visitors.'
			}
		);
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			getVisitors();
		}
	}
</script>

<div class="mx-2 flex gap-x-2">
	<Input
		class="w-80"
		placeholder="search for a person..."
		bind:value={searchQuery}
		onkeydown={handleKeyDown}
	/>
	<Button onclick={getVisitors}>Search</Button>
</div>
<DataTable data={allVisitors} {columns} />
