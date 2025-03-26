<script>
	import { cn } from '$lib/utils';
	let { class: className = '' } = $props();
</script>

<div class={cn('relative h-8 w-8', className)}>
	<div class="absolute inset-0 bg-primary rounded-md"></div>
	<div class="absolute inset-[2px] bg-background rounded-md flex items-center justify-center">
		<div class="grid grid-cols-2 gap-[2px]">
			<div class="h-[6px] w-[6px] bg-primary rounded-sm"></div>
			<div class="h-[6px] w-[6px] bg-primary rounded-sm"></div>
			<div class="h-[6px] w-[6px] bg-primary rounded-sm"></div>
			<div class="h-[6px] w-[6px] bg-primary/50 rounded-sm"></div>
		</div>
	</div>
	<div
		class="absolute -top-1 -right-1 h-3 w-3 bg-primary/80 rounded-full border-2 border-background"
	></div>
</div>
