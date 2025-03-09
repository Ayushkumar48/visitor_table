<script lang="ts">
	import Breadcrumb from '$lib/components/custom/Breadcrumb.svelte';
	import SidebarLeft from '$lib/components/custom/SidebarLeft.svelte';
	import SidebarRight from '$lib/components/sidebar-right.svelte';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	let { children, data } = $props();
</script>

<Sidebar.Provider class="flex h-screen">
	<SidebarLeft {data} />
	<div class="flex-grow flex flex-col overflow-y-hidden">
		<header class="flex h-12 items-center justify-start gap-4 p-4">
			<Sidebar.Trigger />
			<div>
				<Separator orientation="vertical" class="h-6" />
			</div>
			<Breadcrumb />
		</header>
		<Sidebar.Inset class="lg:pr-64">
			{@render children?.()}
		</Sidebar.Inset>
	</div>
	<SidebarRight />
</Sidebar.Provider>
