<script>
	import { onMount } from 'svelte';
	import { Toaster } from '$lib/components/ui/sonner/index.js';
	import '../app.css';
	import { user } from '$lib/client/store.svelte';
	import { ModeWatcher } from 'mode-watcher';
	let { children, data } = $props();
	onMount(() => {
		user.current = data.user;
	});
</script>

<ModeWatcher />
<Toaster richColors position="bottom-right" />
{@render children()}
