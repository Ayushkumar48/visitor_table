<script lang="ts">
	import { Calendar as CalendarPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils.js';
	import { Info } from '@lucide/svelte';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: CalendarPrimitive.HeadingProps = $props();
</script>

<div class="flex gap-x-1 items-center">
	<CalendarPrimitive.Heading bind:ref class={cn('text-sm font-medium', className)} {...restProps} />
	<Tooltip.Provider>
		<Tooltip.Root>
			<Tooltip.Trigger>
				<Info class="w-[16px] h-[16px]" />
			</Tooltip.Trigger>
			<Tooltip.Content>
				<p class="w-[40ch] text-sm text-wrap">
					Hover over a date to see number of persons visited on that date.
				</p>
			</Tooltip.Content>
		</Tooltip.Root>
	</Tooltip.Provider>
</div>
