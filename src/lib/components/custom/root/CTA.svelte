<script>
	import { Button } from '$lib/components/ui/button';
	import { ArrowRight } from '@lucide/svelte';
	import { siGithub } from 'simple-icons';
</script>

<section class="py-20">
	<div class="container mx-auto px-4">
		<div
			class="bg-primary/5 border border-primary/10 rounded-2xl p-8 md:p-12 max-w-5xl mx-auto text-center"
		>
			<h2 class="text-3xl font-bold mb-4">Ready to Transform Your Visitor Experience?</h2>
			<p class="text-muted-foreground max-w-2xl mx-auto mb-8">
				Join the community of organizations using Visitor Table to streamline their visitor
				management.
			</p>
			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<Button size="lg" href="/login?action=signup">
					Get Started
					<ArrowRight class="ml-2 h-4 w-4" />
				</Button>
				<Button
					variant="outline"
					size="lg"
					class="flex gap-x-2 fill-black dark:fill-white"
					href="https://github.com/Ayushkumar48/visitor_table"
					target="_blank"
					rel="noopener noreferrer"
				>
					{@html siGithub.svg}
					Star on GitHub
				</Button>
			</div>
		</div>
	</div>
</section>
