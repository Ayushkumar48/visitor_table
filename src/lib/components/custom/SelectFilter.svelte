<script lang="ts">
	import * as Select from '$lib/components/ui/select/index.js';

	const filters = [
		{ value: 'name', label: 'Name' },
		{ value: 'phonenumber', label: 'Phone Number' },
		{ value: 'dateofvisit', label: 'Date of Visit' },
		{ value: 'host', label: 'Host' },
		{ value: 'vehiclenumber', label: 'Vehicle Number' }
	];

	let { filter = $bindable() } = $props();

	const triggerContent = $derived(filters.find((f) => f.value === filter)?.label);
</script>

<Select.Root type="single" name="favoriteFruit" bind:value={filter}>
	<Select.Trigger class="w-[180px]">
		{triggerContent}
	</Select.Trigger>
	<Select.Content>
		<Select.Group>
			{#each filters as filter}
				<Select.Item value={filter.value} label={filter.label} />
			{/each}
		</Select.Group>
	</Select.Content>
</Select.Root>
