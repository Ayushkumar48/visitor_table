<script>
	const steps = [
		{
			number: 1,
			title: 'Register',
			description: 'Quickly enter visitor information in our intuitive form.'
		},
		{
			number: 2,
			title: 'Notify',
			description:
				'Automatically alert employees when their visitors arrive with email or SMS alerts.'
		},
		{
			number: 3,
			title: 'Track',
			description: 'Monitor visitor status and maintain secure digital records.'
		}
	];
</script>

<section id="how-it-works" class="py-20">
	<div class="container mx-auto px-4">
		<div class="text-center mb-16">
			<h2 class="text-3xl font-bold">Simple Process, Powerful Results</h2>
			<p class="mt-4 text-muted-foreground max-w-2xl mx-auto">
				Our streamlined workflow makes visitor management effortless.
			</p>
		</div>

		<div class="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
			{#each steps as step}
				<div class="flex flex-col items-center text-center">
					<div class="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
						<span class="text-primary font-bold text-xl">{step.number}</span>
					</div>
					<h3 class="text-xl font-semibold mb-2">{step.title}</h3>
					<p class="text-muted-foreground">
						{step.description}
					</p>
				</div>
			{/each}
		</div>
	</div>
</section>
