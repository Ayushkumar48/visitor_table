<script>
	import Header from '$lib/components/custom/root/Header.svelte';
	import Hero from '$lib/components/custom/root/Hero.svelte';
	import Features from '$lib/components/custom/root/Features.svelte';
	import HowItWorks from '$lib/components/custom/root/HowItWorks.svelte';
	import CTA from '$lib/components/custom/root/CTA.svelte';
	import Contribute from '$lib/components/custom/root/Contribute.svelte';
	import Footer from '$lib/components/custom/root/Footer.svelte';
</script>

<div class="flex flex-col min-h-screen">
	<Header />
	<main class="flex-1">
		<Hero />
		<Features />
		<HowItWorks />
		<Contribute />
		<CTA />
	</main>
	<Footer />
</div>
