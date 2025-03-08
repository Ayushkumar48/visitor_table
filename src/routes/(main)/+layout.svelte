<script lang="ts">
	import SidebarLeft from '$lib/components/custom/SidebarLeft.svelte';
	import SidebarRight from '$lib/components/sidebar-right.svelte';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	let { children, data } = $props();
</script>

<Sidebar.Provider>
	<SidebarLeft {data} />
	{@render children?.()}
	<SidebarRight />
</Sidebar.Provider>
