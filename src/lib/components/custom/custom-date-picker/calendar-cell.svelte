<script lang="ts">
	import { Calendar as CalendarPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils.js';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: CalendarPrimitive.CellProps = $props();

	let numberofVisitors = $state(0);
	let hoverTimeout: number | null = null;

	async function fetchVisitorData() {
		const res = await fetch('/api/visitorNumbers', {
			headers: {
				targetDate: `${restProps.date.year}-${restProps.date.month}-${restProps.date.day}`
			}
		});
		numberofVisitors = await res.json();
	}

	function handleMouseEnter() {
		hoverTimeout = setTimeout(async () => {
			await fetchVisitorData();
			hoverTimeout = null;
		}, 400);
	}

	function handleMouseLeave() {
		if (hoverTimeout) {
			clearTimeout(hoverTimeout);
			hoverTimeout = null;
		}
	}
</script>

{#snippet customTrigger()}
	<CalendarPrimitive.Cell
		class={cn(
			'[&:has([data-selected])]:bg-accent [&:has([data-selected][data-outside-month])]:bg-accent/50 relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([data-selected])]:rounded-md',
			className
		)}
		bind:ref
		{...restProps}
		onmouseenter={handleMouseEnter}
		onmouseleave={handleMouseLeave}
	/>
{/snippet}

<Tooltip.Provider delayDuration={600} disableHoverableContent={true}>
	<Tooltip.Root>
		<Tooltip.Trigger>
			{@render customTrigger()}
		</Tooltip.Trigger>
		<Tooltip.Content>
			<p class="text-sm">{numberofVisitors}</p>
		</Tooltip.Content>
	</Tooltip.Root>
</Tooltip.Provider>
