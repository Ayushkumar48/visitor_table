<script lang="ts">
	import CalendarIcon from 'lucide-svelte/icons/calendar';
	import {
		CalendarDate,
		DateFormatter,
		type DateValue,
		getLocalTimeZone,
		parseDate,
		today
	} from '@internationalized/date';

	import { cn } from '$lib/utils.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Calendar } from '$lib/components/ui/calendar/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import * as Form from '$lib/components/ui/form/index.js';
	import type { Infer } from 'sveltekit-superforms';
	import type { VisitorSchema } from '$lib/client/schema';
	import type { FsSuperForm } from 'formsnap';

	let { date = $bindable(), form } = $props<{
		date: string;
		form: FsSuperForm<Infer<VisitorSchema>, any>;
	}>();

	const df = new DateFormatter('en-US', {
		dateStyle: 'long'
	});

	let value = $state<DateValue | undefined>();

	$effect(() => {
		value = date ? parseDate(date) : undefined;
	});

	let placeholder = $state(today(getLocalTimeZone()));
</script>

<Form.Field {form} name="dateofvisit" class="w-1/2">
	<Form.Control>
		{#snippet children({ props })}
			<Form.Label>Date of Visit</Form.Label>
			<Popover.Root>
				<Popover.Trigger {...props}>
					{#snippet child({ props })}
						<Button
							variant="outline"
							class={cn('w-[280px] pl-4 text-left font-normal', !value && 'text-muted-foreground')}
							{...props}
						>
							{value ? df.format(value.toDate(getLocalTimeZone())) : 'Pick a date'}
							<CalendarIcon class="ml-auto size-4 opacity-50" />
						</Button>
					{/snippet}
				</Popover.Trigger>
				<Popover.Content class="w-auto p-0" side="top">
					<Calendar
						type="single"
						{value}
						bind:placeholder
						minValue={new CalendarDate(1900, 1, 1)}
						maxValue={today(getLocalTimeZone())}
						calendarLabel="Date of birth"
						onValueChange={(v) => {
							if (v) {
								date = v.toString();
							} else {
								date = '';
							}
						}}
					/>
				</Popover.Content>
			</Popover.Root>
			<Form.FieldErrors />
			<input hidden bind:value={date} name={props.name} />
		{/snippet}
	</Form.Control>
</Form.Field>
