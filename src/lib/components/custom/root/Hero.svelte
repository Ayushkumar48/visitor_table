<script>
	import Logo from '$lib/components/Logo.svelte';
	import { Button } from '$lib/components/ui/button';
	import { ArrowRight } from 'lucide-svelte';
	import { siGithub } from 'simple-icons';
</script>

<section class="container mx-auto px-4 py-20 md:py-32 flex flex-col items-center text-center">
	<div class="mb-8">
		<Logo class="scale-[2]" />
	</div>

	<h1 class="text-4xl md:text-6xl font-bold tracking-tight max-w-3xl">
		Streamline Visitor Management with Elegance
	</h1>
	<p class="mt-6 text-lg text-muted-foreground max-w-2xl">
		An open source, modern solution for gatekeepers and receptionists to register and track visitors
		with ease and professionalism.
	</p>
	<div class="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
		<Button size="lg" href="/login?action=signup">
			Get Started
			<ArrowRight class="ml-2 h-4 w-4" />
		</Button>
		<Button
			variant="outline"
			size="lg"
			class="fill-black dark:fill-white flex gap-x-3"
			href="https://github.com/Ayushkumar48/visitor_table"
			target="_blank"
			rel="noopener noreferrer"
		>
			{@html siGithub.svg}
			View on GitHub
		</Button>
	</div>
	<div class="mt-16 relative w-full max-w-4xl">
		<div
			class="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary-foreground/20 rounded-lg blur-lg"
		></div>
		<div class="relative bg-background rounded-lg border shadow-lg overflow-hidden">
			<img
				src="/root-picture.webp?height=600&width=1200"
				alt="Visitor Table dashboard preview"
				class="w-full h-auto"
			/>
		</div>
	</div>
</section>
