<script lang="ts">
	import DataTable from '$lib/components/custom/data-table/data-table.svelte';
	import { columns } from '$lib/components/custom/data-table/columns';
	let { data } = $props();
</script>

<DataTable data={data.allVisitors} {columns} />
