<script lang="ts">
	import {
		Approval,
		Authorized,
		DesignNotes,
		EasyAccount,
		FullyEncrypted,
		MobileRemainders
	} from '$lib/assets/illustrations/index.js';
	import Login from '$lib/components/custom/login/Login.svelte';
	import Signup from '$lib/components/custom/login/Signup.svelte';
	import { cubicInOut, quintIn } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	let { data } = $props();
	let login = $state(true);
</script>

<div class="w-screen h-screen relative">
	{#if login}
		<div
			in:fly={{ x: 30, duration: 500, delay: 300, easing: cubicInOut }}
			out:fly={{ x: -30, duration: 300, easing: quintIn }}
			class="fixed h-screen w-screen"
		>
			<Login data={{ form: data.login }} bind:login />
			<EasyAccount class="absolute top-1/2 left-[10%] w-52 h-52" />
			<Approval class="absolute top-1/3 right-[5%] xl:right-[10%] w-72 h-72" />
			<DesignNotes class="absolute top-[10%] left-[4%] xl:left-[11%] w-64 h-64" />
		</div>
	{:else}
		<div
			in:fly={{ x: -30, duration: 500, delay: 300, easing: cubicInOut }}
			out:fly={{ x: 30, duration: 300, easing: quintIn }}
			class="fixed h-screen w-screen"
		>
			<Signup data={{ form: data.signup }} bind:login />

			<Authorized class="absolute top-1/2 right-[10%] w-52 h-52" />
			<FullyEncrypted class="absolute top-1/3 left-[5%] xl:left-[10%] w-72 h-72" />
			<MobileRemainders class="absolute top-[10%] right-[4%] xl:right-[11%] w-64 h-64" />
		</div>
	{/if}
</div>
