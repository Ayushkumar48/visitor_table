<script lang="ts">
	import Calendars from '$lib/components/calendars.svelte';
	import CustomDatePicker from '$lib/components/custom/custom-date-picker/CustomDatePicker.svelte';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { Plus } from '@lucide/svelte';
	import type { ComponentProps } from 'svelte';
	import NavUser from './custom/NavUser.svelte';

	const data = {
		calendars: [
			{
				name: 'My Calendars',
				items: ['Personal', 'Work', 'Family']
			},
			{
				name: 'Favorites',
				items: ['Holidays', 'Birthdays']
			},
			{
				name: 'Other',
				items: ['Travel', 'Reminders', 'Deadlines']
			}
		]
	};

	let { ref = $bindable(null), ...restProps }: ComponentProps<typeof Sidebar.Root> = $props();
</script>

<Sidebar.Root
	bind:ref
	collapsible="none"
	class="fixed top-0 right-0 hidden h-svh border-l lg:flex"
	{...restProps}
>
	<!-- <Sidebar.Header class="border-sidebar-border h-16 border-b">
		<NavUser />
	</Sidebar.Header> -->
	<Sidebar.Content>
		<CustomDatePicker />
		<Sidebar.Separator class="mx-0" />
		<!-- <Calendars calendars={data.calendars} /> -->
	</Sidebar.Content>
	<!-- <Sidebar.Footer>
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				<Sidebar.MenuButton>
					<Plus />
					<span>New Calendar</span>
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Footer> -->
</Sidebar.Root>
