<script lang="ts">
	import { goto } from '$app/navigation';
	import { user } from '$lib/client/store.svelte';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { useSidebar } from '$lib/components/ui/sidebar/index.js';
	import { LogOut, ChevronsUpDown, BadgeCheck } from '@lucide/svelte';
	import { onMount } from 'svelte';

	const sidebar = useSidebar();
	let image: string | null = null;

	async function fetchImage() {
		if (user.current) {
			try {
				const res = await fetch(`/account/${user.current.id}`);
				if (res.ok) {
					const blob = await res.blob();
					image = URL.createObjectURL(blob);
				} else {
					console.error('Failed to fetch image:', res.statusText);
				}
			} catch (error) {
				console.error('Error fetching image:', error);
			}
		}
	}
	onMount(() => {
		fetchImage();
	});
</script>

<Sidebar.Menu>
	<Sidebar.MenuItem>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				{#snippet child({ props })}
					<Sidebar.MenuButton
						size="lg"
						class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						{...props}
					>
						<Avatar.Root class="h-8 w-8 rounded-lg">
							<Avatar.Image src={image} alt={user.current?.firstname || 'User'} />
							<Avatar.Fallback class="rounded-lg"
								>{user.current &&
									user.current?.firstname[0].toUpperCase() +
										user.current?.lastname[0].toUpperCase()}</Avatar.Fallback
							>
						</Avatar.Root>
						<div class="grid flex-1 text-left text-sm leading-tight">
							<span class="truncate font-semibold"
								>{(user.current && user.current?.firstname + ' ' + user.current?.lastname) ||
									'User'}</span
							>
							<span class="truncate text-xs">{user.current?.email}</span>
						</div>
						<ChevronsUpDown class="ml-auto size-4" />
					</Sidebar.MenuButton>
				{/snippet}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content
				class="w-[var(--bits-dropdown-menu-anchor-width)] min-w-56 rounded-lg"
				side={sidebar.isMobile ? 'bottom' : 'right'}
				align="end"
				sideOffset={4}
			>
				<DropdownMenu.Label class="p-0 font-normal">
					<div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
						<Avatar.Root class="h-8 w-8 rounded-lg">
							<Avatar.Image src={image} alt={user.current?.firstname || 'User'} />
							<Avatar.Fallback class="rounded-lg"
								>{user.current &&
									user.current?.firstname[0].toUpperCase() +
										user.current?.lastname[0].toUpperCase()}</Avatar.Fallback
							>
						</Avatar.Root>
						<div class="grid flex-1 text-left text-sm leading-tight">
							<span class="truncate font-semibold"
								>{(user.current && user.current?.firstname + ' ' + user.current?.lastname) ||
									'User'}</span
							>
							<span class="truncate text-xs">{user.current?.email}</span>
						</div>
					</div>
				</DropdownMenu.Label>
				<DropdownMenu.Separator />

				<DropdownMenu.Group>
					<DropdownMenu.Item onclick={() => goto('/account')}>
						<BadgeCheck />
						Account
					</DropdownMenu.Item>
				</DropdownMenu.Group>
				<DropdownMenu.Separator />
				<DropdownMenu.Item
					onclick={async () => {
						await fetch('/api/logout');
						user.current = null;
						goto('/login');
					}}
				>
					<LogOut />
					Log out
				</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</Sidebar.MenuItem>
</Sidebar.Menu>
