<script lang="ts">
	let { value } = $props();
</script>

<div class="max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap" title={value}>
	{value}
</div>
