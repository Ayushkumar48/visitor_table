<script>
	import Logo from '$lib/components/Logo.svelte';
	import { Separator } from '$lib/components/ui/separator';
	import { siDribbble, siGithub, siX } from 'simple-icons';
	const Links = [
		{
			href: '#features',
			text: 'Features'
		},
		{
			href: '#how-it-works',
			text: 'How It Works'
		},
		{
			href: '#contribute',
			text: 'Contribute'
		}
	];
	const SocialLinks = [
		{
			href: 'https://github.com/Ayushkumar48/visitor_table',
			icon: siGithub.svg
		},
		{
			href: 'https://x.com/AyushKu32297268',
			icon: siX.svg
		},
		{
			href: 'https://dribbble.com/Ayushkumar48',
			icon: siDribbble.svg
		}
	];
</script>

<footer class="bg-muted/30 py-12 border-t">
	<div class="container mx-auto px-4">
		<div class="flex flex-col md:flex-row justify-between items-center">
			<div class="flex items-center gap-3 mb-6 md:mb-0">
				<Logo />
				<span class="font-bold">Visitor Table</span>
			</div>

			<div class="flex gap-8 mb-6 md:mb-0">
				{#each Links as link}
					<a
						href={link.href}
						class="text-sm text-muted-foreground hover:text-foreground transition-colors"
						>{link.text}</a
					>
				{/each}
			</div>

			<div class="flex gap-4">
				{#each SocialLinks as link}
					<a
						href={link.href}
						class="text-muted-foreground hover:text-foreground transition-colors h-5 w-5 fill-black dark:fill-white"
						target="_blank"
						rel="noopener noreferrer"
					>
						{@html link.icon}
					</a>
				{/each}
			</div>
		</div>

		<Separator class="my-8" />

		<div class="text-center text-sm text-muted-foreground">
			<p>© 2025 Visitor Table. Open Source Project.</p>
			<div class="flex justify-center gap-4 mt-2">
				<a href="#top" class="hover:underline">License</a>
				<a href="#top" class="hover:underline">Privacy Policy</a>
				<a href="#top" class="hover:underline">Code of Conduct</a>
			</div>
		</div>
	</div>
</footer>
