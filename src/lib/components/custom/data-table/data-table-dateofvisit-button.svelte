<script lang="ts">
	import type { ComponentProps } from 'svelte';
	import { ArrowUpDown } from '@lucide/svelte';
	import { Button } from '$lib/components/ui/button/index.js';

	let { variant = 'ghost', ...restProps }: ComponentProps<typeof Button> = $props();
</script>

<Button {variant} {...restProps} class="flex p-1 gap-0.5 text-wrap">
	Date of Visit
	<ArrowUpDown />
</Button>
