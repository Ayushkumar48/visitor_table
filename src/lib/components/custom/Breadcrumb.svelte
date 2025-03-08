<script lang="ts">
	import { MediaQuery } from 'svelte/reactivity';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import * as Drawer from '$lib/components/ui/drawer/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import { page } from '$app/state';

	let items = $derived.by(() => {
		let currentPath = '';
		const newItems = [{ href: '/', label: 'Home' }];
		const pathSegments = page.url.pathname.split('/');
		if (pathSegments.length > 1) {
			for (let i = 1; i < pathSegments.length; i++) {
				if (pathSegments[i]) {
					currentPath += '/' + pathSegments[i];

					if (pathSegments[i].toLowerCase() !== 'home') {
						newItems.push({
							href: currentPath,
							label: pathSegments[i][0].toUpperCase() + pathSegments[i].slice(1)
						});
					}
				}
			}
		}

		return newItems;
	});

	const ITEMS_TO_DISPLAY = 3;

	let open = $state(false);

	const isDesktop = new MediaQuery('(min-width: 768px)');
</script>

{#if items?.length >= ITEMS_TO_DISPLAY}
	<Breadcrumb.Root>
		<Breadcrumb.List>
			<Breadcrumb.Item>
				<Breadcrumb.Link href={items[0].href}>
					{items[0].label}
				</Breadcrumb.Link>
			</Breadcrumb.Item>
			<Breadcrumb.Separator />
			{#if items.length > ITEMS_TO_DISPLAY}
				<Breadcrumb.Item>
					{#if isDesktop.current}
						<DropdownMenu.Root bind:open>
							<DropdownMenu.Trigger class="flex items-center gap-1" aria-label="Toggle menu">
								<Breadcrumb.Ellipsis class="size-4" />
							</DropdownMenu.Trigger>
							<DropdownMenu.Content align="start">
								{#each items.slice(1, -2) as item}
									<DropdownMenu.Item>
										<a href={item.href ? item.href : '#'}>
											{item.label}
										</a>
									</DropdownMenu.Item>
								{/each}
							</DropdownMenu.Content>
						</DropdownMenu.Root>
					{:else}
						<Drawer.Root bind:open>
							<Drawer.Trigger aria-label="Toggle Menu">
								<Breadcrumb.Ellipsis class="size-4" />
							</Drawer.Trigger>
							<Drawer.Content>
								<Drawer.Header class="text-left">
									<Drawer.Title>Navigate to</Drawer.Title>
									<Drawer.Description>Select a page to navigate to.</Drawer.Description>
								</Drawer.Header>
								<div class="grid gap-1 px-4">
									{#each items.slice(1, -2) as item}
										<a href={item.href ? item.href : '#'} class="py-1 text-sm">
											{item.label}
										</a>
									{/each}
								</div>
								<Drawer.Footer class="pt-4">
									<Drawer.Close class={buttonVariants({ variant: 'outline' })}>Close</Drawer.Close>
								</Drawer.Footer>
							</Drawer.Content>
						</Drawer.Root>
					{/if}
				</Breadcrumb.Item>
				<Breadcrumb.Separator />
			{/if}

			{#each items.slice(-ITEMS_TO_DISPLAY + 1) as item}
				<Breadcrumb.Item>
					{#if item.href}
						<Breadcrumb.Link href={item.href} class="max-w-20 truncate md:max-w-none">
							{item.label}
						</Breadcrumb.Link>
						<Breadcrumb.Separator />
					{:else}
						<Breadcrumb.Page class="max-w-20 truncate md:max-w-none">
							{item.label}
						</Breadcrumb.Page>
					{/if}
				</Breadcrumb.Item>
			{/each}
		</Breadcrumb.List>
	</Breadcrumb.Root>
{:else if items?.length < ITEMS_TO_DISPLAY}
	<Breadcrumb.Root>
		<Breadcrumb.List>
			{#each items as item}
				<Breadcrumb.Item>
					<Breadcrumb.Link href={item.href}>
						{item.label}
					</Breadcrumb.Link>
				</Breadcrumb.Item>
				<Breadcrumb.Separator />
			{/each}
		</Breadcrumb.List>
	</Breadcrumb.Root>
{/if}
