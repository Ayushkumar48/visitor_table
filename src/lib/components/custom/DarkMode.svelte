<script lang="ts">
	import { toggleMode, mode } from 'mode-watcher';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Moon, Sun } from '@lucide/svelte';
	import { fly, slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
</script>

<Button onclick={toggleMode} variant="outline" size="icon" class="relative overflow-hidden">
	{#key $mode}
		<div
			in:fly={{
				x: 100,
				duration: 300,
				easing: quintOut
			}}
			class="absolute inset-0 flex items-center justify-center"
		>
			{#if $mode === 'dark'}
				<Moon class="size-4 transition-all" />
			{:else}
				<Sun class="size-4 transition-all" />
			{/if}
		</div>
	{/key}
	<span class="sr-only">Toggle theme</span>
</Button>
