<script>
	import { Button } from '$lib/components/ui/button';
	import Logo from '$lib/components/Logo.svelte';
	import { siGithub } from 'simple-icons';
	import { page } from '$app/state';
	import RootNavUser from '$lib/components/custom/RootNavUser.svelte';
	import { ArrowRightIcon } from 'lucide-svelte';
	import DarkMode from '$lib/components/custom/DarkMode.svelte';
</script>

<header class="container mx-auto py-4 px-4 flex justify-between items-center">
	<div class="flex items-center gap-2">
		<Logo />
		<span class="font-bold text-xl">Visitor Table</span>
	</div>
	<nav class="hidden md:flex gap-5 items-center">
		<a href="#features" class="text-sm font-medium hover:text-primary transition-colors">
			Features
		</a>
		<a href="#how-it-works" class="text-sm font-medium hover:text-primary transition-colors">
			How It Works
		</a>

		<a
			href="https://github.com/Ayushkumar48/visitor_table"
			target="_blank"
			rel="noopener noreferrer"
			class="text-sm font-medium hover:text-primary transition-colors"
		>
			Contribute
		</a>
		<a href="/docs" class="text-sm font-medium hover:text-primary transition-colors"> Docs </a>
		<a
			href="https://github.com/Ayushkumar48/visitor_table"
			target="_blank"
			rel="noopener noreferrer"
		>
			<Button variant="ghost" size="icon" class="rounded-full fill-black dark:fill-white">
				{@html siGithub.svg}
				<span class="sr-only">GitHub</span>
			</Button>
		</a>
	</nav>
	<div class="flex items-center gap-2">
		<DarkMode />
		{#if !page.data.user}
			<Button variant="outline" size="sm" href="/login?action=signup">
				Get Started
				<ArrowRightIcon class="size-2" />
			</Button>
			<Button size="sm" href="/login">Sign In</Button>
		{:else}
			<Button variant="outline" size="sm" href="/visitors/today">Work</Button>
			<RootNavUser />
		{/if}
	</div>
</header>
