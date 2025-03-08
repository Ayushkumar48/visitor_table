<script lang="ts">
	import Calendar from 'lucide-svelte/icons/calendar';
	import House from 'lucide-svelte/icons/house';
	import Inbox from 'lucide-svelte/icons/inbox';
	import Search from 'lucide-svelte/icons/search';
	import Settings from 'lucide-svelte/icons/settings';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index';
	import { ChevronsUpDown, CircleUserRound, Ellipsis } from 'lucide-svelte';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import Breadcrumb from './Breadcrumb.svelte';
	import Sun from 'lucide-svelte/icons/sun';
	import Moon from 'lucide-svelte/icons/moon';

	import { toggleMode } from 'mode-watcher';
	import { user } from '$lib/client/store.svelte';
	import { goto } from '$app/navigation';
	import AddVisitor from './AddVisitor.svelte';
	import type { Infer, SuperValidated } from 'sveltekit-superforms';
	import type { VisitorSchema } from '$lib/client/schema';
	import { GalleryVerticalEnd, AudioWaveform, Command } from '@lucide/svelte';
	import TeamSwitcher from './TeamSwitcher.svelte';
	import NavUser from './NavUser.svelte';

	const items = [
		{
			title: 'Home',
			url: '/',
			icon: House
		},
		{
			title: 'All Visitors',
			url: '/visitors',
			icon: Inbox
		},
		{
			title: 'Calendar',
			url: '/abc/abc/abc/abc',
			icon: Calendar
		},
		{
			title: 'Search',
			url: '#',
			icon: Search
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
	let { data } = $props<{ data: { form: SuperValidated<Infer<VisitorSchema>> } }>();
</script>

<Sidebar.Root collapsible="icon">
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
					<Sun
						class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
					/>
					<Moon
						class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
					/>
					<span>Change Mode</span>
					<span class="sr-only">Toggle theme</span>
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
			<NavUser />
		</Sidebar.Menu>
	</Sidebar.Footer>
</Sidebar.Root>
<Sidebar.Inset>
	<header class="flex h-12 items-center justify-start gap-4 px-4">
		<Sidebar.Trigger />
		<div>
			<Separator orientation="vertical" class="h-6" />
		</div>
		<Breadcrumb />
	</header>
</Sidebar.Inset>
