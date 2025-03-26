<script>
	import { Card, CardHeader, CardTitle, CardDescription } from '$lib/components/ui/card';
	import { NotepadText, Lock, Check, ChartBar, Bell, Users } from '@lucide/svelte';

	const features = [
		{
			icon: Users,
			title: 'Quick Registration',
			description: 'Register visitors in seconds with our streamlined form and intuitive interface.'
		},
		{
			icon: NotepadText,
			title: 'Visitor Logs',
			description: 'Keep detailed records of all visitors with searchable and exportable logs.'
		},
		{
			icon: Lock,
			title: 'Secure Data',
			description:
				'All visitor information is securely stored and protected with enterprise-grade security.'
		},
		{
			icon: Check,
			title: 'Check-in/Check-out',
			description: 'Track visitor entry and exit times automatically for complete visibility.'
		},
		{
			icon: ChartBar,
			title: 'Analytics',
			description: 'Gain insights into visitor patterns with built-in reporting and analytics.'
		},
		{
			icon: Bell,
			title: 'Notifications',
			description:
				'Automatically notify employees when their visitors arrive with email or SMS alerts.'
		}
	];
</script>

<section id="features" class="bg-muted/50 py-20">
	<div class="container mx-auto px-4">
		<div class="text-center mb-16">
			<h2 class="text-3xl font-bold">Powerful Features, Simple Interface</h2>
			<p class="mt-4 text-muted-foreground max-w-2xl mx-auto">
				Everything you need to manage visitors efficiently, without the complexity.
			</p>
		</div>

		<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
			{#each features as feature}
				{@const Icon = feature.icon}
				<Card>
					<CardHeader class="p-6">
						<div class="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
							<Icon class="text-primary h-5 w-5" />
						</div>
						<CardTitle>{feature.title}</CardTitle>
						<CardDescription>
							{feature.description}
						</CardDescription>
					</CardHeader>
				</Card>
			{/each}
		</div>
	</div>
</section>
