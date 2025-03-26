<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { LogOut, BadgeCheck } from '@lucide/svelte';
	import { onMount } from 'svelte';

	let image = $state<string | null>(null);

	async function fetchImage() {
		if (page.data.user) {
			try {
				const res = await fetch(`/account/${page.data.user.id}`);
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

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		<Avatar.Root class="h-8 w-8 rounded-md">
			<Avatar.Image src={image} alt={page.data.user?.firstname || 'User'} />
			<Avatar.Fallback class="rounded-md"
				>{page.data.user &&
					page.data.user?.firstname[0].toUpperCase() +
						page.data.user?.lastname[0].toUpperCase()}</Avatar.Fallback
			>
		</Avatar.Root>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content
		class="w-[var(--bits-dropdown-menu-anchor-width)] min-w-56 rounded-lg"
		align="end"
		sideOffset={4}
	>
		<DropdownMenu.Label class="p-0 font-normal">
			<div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
				<Avatar.Root class="h-8 w-8 rounded-lg">
					<Avatar.Image src={image} alt={page.data.user?.firstname || 'User'} />
					<Avatar.Fallback class="rounded-lg"
						>{page.data.user &&
							page.data.user?.firstname[0].toUpperCase() +
								page.data.user?.lastname[0].toUpperCase()}</Avatar.Fallback
					>
				</Avatar.Root>
				<div class="grid flex-1 text-left text-sm leading-tight">
					<span class="truncate font-semibold"
						>{(page.data.user && page.data.user?.firstname + ' ' + page.data.user?.lastname) ||
							'User'}</span
					>
					<span class="truncate text-xs">{page.data.user?.email}</span>
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
				page.data.user = null;
				window.location.reload();
			}}
		>
			<LogOut />
			Log out
		</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
