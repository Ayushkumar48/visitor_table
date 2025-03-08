<script>
	import { onMount } from 'svelte';
	import '../app.css';
	import { user } from '$lib/client/store.svelte';
	import { ModeWatcher } from 'mode-watcher';
	let { children, data } = $props();
	onMount(() => {
		user.current = data.user;
	});
</script>

<ModeWatcher />
{@render children()}
