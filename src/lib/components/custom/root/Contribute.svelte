<script lang="ts">
	import {
		Card,
		CardHeader,
		CardTitle,
		CardDescription,
		CardFooter
	} from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Code, MessageSquareText, BookOpen } from '@lucide/svelte';
	import { siGithub } from 'simple-icons';

	const cards = [
		{
			icon: Code,
			title: 'Contribute Code',
			description:
				'Help improve Visitor Table by contributing code, fixing bugs, or adding new features.',
			footer: {
				text: 'View GitHub',
				svg: siGithub.svg
			}
		},
		{
			icon: MessageSquareText,
			title: 'Report Issues',
			description:
				'Found a bug or have a feature request? Open an issue on GitHub to help us improve.',
			footer: {
				text: 'Open Issue',
				svg: null
			}
		},
		{
			icon: BookOpen,
			title: 'Documentation',
			description:
				'Help improve our documentation to make Visitor Table more accessible to everyone.',
			footer: {
				text: 'View Documentation',
				svg: null
			}
		}
	];
</script>

<section id="contribute" class="bg-muted/50 py-20">
	<div class="container mx-auto px-4">
		<div class="text-center mb-16">
			<h2 class="text-3xl font-bold">Open Source Community</h2>
			<p class="mt-4 text-muted-foreground max-w-2xl mx-auto">
				Visitor Table is built by the community, for the community. Join us in making visitor
				management better for everyone.
			</p>
		</div>

		<div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
			{#each cards as card}
				{@const Icon = card.icon}
				<Card class="flex flex-col justify-between gap-y-2">
					<CardHeader>
						<div class="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
							<Icon class="h-5 w-5 text-primary" />
						</div>
						<CardTitle>{card.title}</CardTitle>
						<CardDescription>
							{card.description}
						</CardDescription>
					</CardHeader>
					<CardFooter>
						<Button variant="ghost" class="w-full flex gap-x-3 fill-black dark:fill-white">
							{#if card.footer.svg}
								{@html card.footer.svg}
							{/if}
							{card.footer.text}
						</Button>
					</CardFooter>
				</Card>
			{/each}
		</div>
	</div>
</section>
