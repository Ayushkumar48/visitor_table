<script lang="ts">
	import Calendar from 'lucide-svelte/icons/calendar';
	import House from 'lucide-svelte/icons/house';
	import Search from 'lucide-svelte/icons/search';
	import Settings from 'lucide-svelte/icons/settings';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';

	import Sun from 'lucide-svelte/icons/sun';
	import Moon from 'lucide-svelte/icons/moon';

	import { toggleMode, mode } from 'mode-watcher';
	import AddVisitor from './AddVisitor.svelte';
	import type { Infer, SuperValidated } from 'sveltekit-superforms';
	import type { VisitorSchema } from '$lib/client/schema';
	import { GalleryVerticalEnd, AudioWaveform, Command, ScrollText } from '@lucide/svelte';
	import TeamSwitcher from './TeamSwitcher.svelte';
	import NavUser from './NavUser.svelte';
	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	const items = [
		{
			title: 'Home',
			url: '/',
			icon: House
		},
		{
			title: 'Today',
			url: '/visitors/today',
			icon: Calendar
		},
		{
			title: 'Search for a visitor',
			url: '/visitors/search',
			icon: Search
		},
		{
			title: "Visitors' Data",
			url: '/visitors',
			icon: ScrollText
		},
		{
			title: 'Settings',
			url: '#',
			icon: Settings
		}
	];
	let teams = [
		{
			name: 'Acme Inc',
			logo: GalleryVerticalEnd,
			plan: 'Enterprise'
		},
		{
			name: 'Acme Corp.',
			logo: AudioWaveform,
			plan: 'Startup'
		},
		{
			name: 'Evil Corp.',
			logo: Command,
			plan: 'Free'
		}
	];
	let { data } = $props<{
		data: { form: SuperValidated<Infer<VisitorSchema>> };
	}>();
</script>

<Sidebar.Root collapsible="icon" class="flex-shrink-0">
	<Sidebar.Header>
		<TeamSwitcher {teams} />
	</Sidebar.Header>
	<Sidebar.Content>
		<Sidebar.Group>
			<Sidebar.GroupLabel>Application</Sidebar.GroupLabel>
			<Sidebar.GroupContent>
				<Sidebar.Menu>
					<Sidebar.MenuItem>
						<AddVisitor {data} />
					</Sidebar.MenuItem>
					{#each items as item (item.title)}
						<Sidebar.MenuItem>
							<Sidebar.MenuButton>
								{#snippet child({ props })}
									<a href={item.url} {...props}>
										<item.icon />
										<span>{item.title}</span>
									</a>
								{/snippet}
							</Sidebar.MenuButton>
						</Sidebar.MenuItem>
					{/each}
				</Sidebar.Menu>
			</Sidebar.GroupContent>
		</Sidebar.Group>
	</Sidebar.Content>
	<Sidebar.Footer>
		<Sidebar.Menu class="space-y-2">
			<Sidebar.MenuItem>
				<Sidebar.MenuButton onclick={toggleMode}>
					{#key $mode}
						<div
							in:fly={{
								y: 100,
								duration: 300,
								easing: quintOut
							}}
							class="inset-0 flex items-center justify-center"
						>
							{#if $mode === 'dark'}
								<Moon class="size-4 transition-all" />
							{:else}
								<Sun class="size-4 transition-all" />
							{/if}
						</div>
					{/key}
					<span>Change Mode</span>
					<span class="sr-only">Toggle theme</span>
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
			<NavUser />
		</Sidebar.Menu>
	</Sidebar.Footer>
</Sidebar.Root>
