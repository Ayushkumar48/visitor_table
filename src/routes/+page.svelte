<script>
	import { Button } from '$lib/components/ui/button';
	import {
		Card,
		CardDescription,
		CardHeader,
		CardTitle,
		CardFooter
	} from '$lib/components/ui/card';
	import { Separator } from '$lib/components/ui/separator';
	import { ArrowRight, Github, Code } from 'lucide-svelte';
</script>

<div class="flex flex-col min-h-screen">
	<!-- Header -->
	<header class="container mx-auto py-4 px-4 flex justify-between items-center">
		<div class="flex items-center gap-2">
			<!-- Custom Logo Design -->
			<div class="relative h-8 w-8">
				<div class="absolute inset-0 bg-primary rounded-md"></div>
				<div class="absolute inset-[2px] bg-background rounded-md flex items-center justify-center">
					<div class="grid grid-cols-2 gap-[2px]">
						<div class="h-[6px] w-[6px] bg-primary rounded-sm"></div>
						<div class="h-[6px] w-[6px] bg-primary rounded-sm"></div>
						<div class="h-[6px] w-[6px] bg-primary rounded-sm"></div>
						<div class="h-[6px] w-[6px] bg-primary/50 rounded-sm"></div>
					</div>
				</div>
				<div
					class="absolute -top-1 -right-1 h-3 w-3 bg-primary/80 rounded-full border-2 border-background"
				></div>
			</div>
			<span class="font-bold text-xl">Visitor Table</span>
		</div>
		<nav class="hidden md:flex gap-6">
			<a href="#features" class="text-sm font-medium hover:text-primary transition-colors"
				>Features</a
			>
			<a href="#how-it-works" class="text-sm font-medium hover:text-primary transition-colors"
				>How It Works</a
			>
			<a href="#contribute" class="text-sm font-medium hover:text-primary transition-colors"
				>Contribute</a
			>
		</nav>
		<div class="flex items-center gap-2">
			<a href="https://github.com" target="_blank" rel="noopener noreferrer">
				<Button variant="ghost" size="icon" class="rounded-full">
					<Github class="h-5 w-5" />
					<span class="sr-only">GitHub</span>
				</Button>
			</a>
			<Button variant="outline" size="sm">Docs</Button>
		</div>
	</header>

	<main class="flex-1">
		<!-- Hero Section -->
		<section class="container mx-auto px-4 py-20 md:py-32 flex flex-col items-center text-center">
			<div class="mb-8 relative">
				<!-- Larger Custom Logo -->
				<div class="relative h-20 w-20 mx-auto">
					<div class="absolute inset-0 bg-primary rounded-xl"></div>
					<div
						class="absolute inset-[4px] bg-background rounded-lg flex items-center justify-center"
					>
						<div class="grid grid-cols-3 gap-[3px]">
							<div class="h-[10px] w-[10px] bg-primary rounded-sm"></div>
							<div class="h-[10px] w-[10px] bg-primary rounded-sm"></div>
							<div class="h-[10px] w-[10px] bg-primary rounded-sm"></div>
							<div class="h-[10px] w-[10px] bg-primary rounded-sm"></div>
							<div class="h-[10px] w-[10px] bg-primary/70 rounded-sm"></div>
							<div class="h-[10px] w-[10px] bg-primary/50 rounded-sm"></div>
							<div class="h-[10px] w-[10px] bg-primary/30 rounded-sm"></div>
							<div class="h-[10px] w-[10px] bg-primary/20 rounded-sm"></div>
							<div class="h-[10px] w-[10px] bg-primary/10 rounded-sm"></div>
						</div>
					</div>
					<div
						class="absolute -top-2 -right-2 h-6 w-6 bg-primary/80 rounded-full border-2 border-background flex items-center justify-center"
					>
						<div class="h-2 w-2 bg-background rounded-full"></div>
					</div>
				</div>
			</div>

			<h1 class="text-4xl md:text-6xl font-bold tracking-tight max-w-3xl">
				Streamline Visitor Management with Elegance
			</h1>
			<p class="mt-6 text-lg text-muted-foreground max-w-2xl">
				An open source, modern solution for gatekeepers and receptionists to register and track
				visitors with ease and professionalism.
			</p>
			<div class="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
				<Button size="lg">
					Get Started
					<ArrowRight class="ml-2 h-4 w-4" />
				</Button>
				<Button variant="outline" size="lg">
					<Github class="mr-2 h-4 w-4" />
					View on GitHub
				</Button>
			</div>
			<div class="mt-16 relative w-full max-w-4xl">
				<div
					class="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary-foreground/20 rounded-lg blur-lg"
				></div>
				<div class="relative bg-background rounded-lg border shadow-lg overflow-hidden">
					<img
						src="/placeholder.svg?height=600&width=1200"
						alt="Visitor Table dashboard preview"
						class="w-full h-auto"
					/>
				</div>
			</div>
		</section>

		<!-- Features Section -->
		<section id="features" class="bg-muted/50 py-20">
			<div class="container mx-auto px-4">
				<div class="text-center mb-16">
					<h2 class="text-3xl font-bold">Powerful Features, Simple Interface</h2>
					<p class="mt-4 text-muted-foreground max-w-2xl mx-auto">
						Everything you need to manage visitors efficiently, without the complexity.
					</p>
				</div>

				<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
					<Card>
						<CardHeader>
							<div
								class="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-2"
							>
								<svg
									class="h-5 w-5 text-primary"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
								>
									<path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
									<path d="M12 4.354a4 4 0 110 0v3.292a7 7 0 000 9.708v2.292a4 4 0 110 0" />
									<path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
							</div>
							<CardTitle>Quick Registration</CardTitle>
							<CardDescription>
								Register visitors in seconds with our streamlined form and intuitive interface.
							</CardDescription>
						</CardHeader>
					</Card>

					<Card>
						<CardHeader>
							<div
								class="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-2"
							>
								<svg
									class="h-5 w-5 text-primary"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
								>
									<path
										d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
									/>
									<path d="M9 12h6M9 16h6" />
								</svg>
							</div>
							<CardTitle>Visitor Logs</CardTitle>
							<CardDescription>
								Keep detailed records of all visitors with searchable and exportable logs.
							</CardDescription>
						</CardHeader>
					</Card>

					<Card>
						<CardHeader>
							<div
								class="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-2"
							>
								<svg
									class="h-5 w-5 text-primary"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
								>
									<path
										d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
									/>
								</svg>
							</div>
							<CardTitle>Secure Data</CardTitle>
							<CardDescription>
								All visitor information is securely stored and protected with enterprise-grade
								security.
							</CardDescription>
						</CardHeader>
					</Card>

					<Card>
						<CardHeader>
							<div
								class="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-2"
							>
								<svg
									class="h-5 w-5 text-primary"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
								>
									<path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
							</div>
							<CardTitle>Check-in/Check-out</CardTitle>
							<CardDescription>
								Track visitor entry and exit times automatically for complete visibility.
							</CardDescription>
						</CardHeader>
					</Card>

					<Card>
						<CardHeader>
							<div
								class="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-2"
							>
								<svg
									class="h-5 w-5 text-primary"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
								>
									<path
										d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
									/>
								</svg>
							</div>
							<CardTitle>Analytics</CardTitle>
							<CardDescription>
								Gain insights into visitor patterns with built-in reporting and analytics.
							</CardDescription>
						</CardHeader>
					</Card>

					<Card>
						<CardHeader>
							<div
								class="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-2"
							>
								<svg
									class="h-5 w-5 text-primary"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
								>
									<path
										d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
									/>
								</svg>
							</div>
							<CardTitle>Notifications</CardTitle>
							<CardDescription>
								Automatically notify employees when their visitors arrive with email or SMS alerts.
							</CardDescription>
						</CardHeader>
					</Card>
				</div>
			</div>
		</section>

		<!-- How It Works Section -->
		<section id="how-it-works" class="py-20">
			<div class="container mx-auto px-4">
				<div class="text-center mb-16">
					<h2 class="text-3xl font-bold">Simple Process, Powerful Results</h2>
					<p class="mt-4 text-muted-foreground max-w-2xl mx-auto">
						Our streamlined workflow makes visitor management effortless.
					</p>
				</div>

				<div class="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
					<div class="flex flex-col items-center text-center">
						<div class="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
							<span class="text-primary font-bold text-xl">1</span>
						</div>
						<h3 class="text-xl font-semibold mb-2">Register</h3>
						<p class="text-muted-foreground">
							Quickly enter visitor information in our intuitive form.
						</p>
					</div>

					<div class="flex flex-col items-center text-center">
						<div class="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
							<span class="text-primary font-bold text-xl">2</span>
						</div>
						<h3 class="text-xl font-semibold mb-2">Notify</h3>
						<p class="text-muted-foreground">
							Automatically alert employees when their visitors arrive.
						</p>
					</div>

					<div class="flex flex-col items-center text-center">
						<div class="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
							<span class="text-primary font-bold text-xl">3</span>
						</div>
						<h3 class="text-xl font-semibold mb-2">Track</h3>
						<p class="text-muted-foreground">
							Monitor visitor status and maintain secure digital records.
						</p>
					</div>
				</div>
			</div>
		</section>

		<!-- Contribute Section (replacing testimonials) -->
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
					<Card>
						<CardHeader>
							<div
								class="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-2"
							>
								<Code class="h-5 w-5 text-primary" />
							</div>
							<CardTitle>Contribute Code</CardTitle>
							<CardDescription>
								Help improve Visitor Table by contributing code, fixing bugs, or adding new
								features.
							</CardDescription>
						</CardHeader>
						<CardFooter>
							<Button variant="ghost" class="w-full">
								<Github class="mr-2 h-4 w-4" />
								View GitHub
							</Button>
						</CardFooter>
					</Card>

					<Card>
						<CardHeader>
							<div
								class="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-2"
							>
								<svg
									class="h-5 w-5 text-primary"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
								>
									<path
										d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
									/>
								</svg>
							</div>
							<CardTitle>Report Issues</CardTitle>
							<CardDescription>
								Found a bug or have a feature request? Open an issue on GitHub to help us improve.
							</CardDescription>
						</CardHeader>
						<CardFooter>
							<Button variant="ghost" class="w-full">Open Issue</Button>
						</CardFooter>
					</Card>

					<Card>
						<CardHeader>
							<div
								class="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-2"
							>
								<svg
									class="h-5 w-5 text-primary"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
								>
									<path
										d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
									/>
								</svg>
							</div>
							<CardTitle>Documentation</CardTitle>
							<CardDescription>
								Help improve our documentation to make Visitor Table more accessible to everyone.
							</CardDescription>
						</CardHeader>
						<CardFooter>
							<Button variant="ghost" class="w-full">View Docs</Button>
						</CardFooter>
					</Card>
				</div>
			</div>
		</section>

		<!-- CTA Section -->
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
						<Button size="lg">
							Get Started
							<ArrowRight class="ml-2 h-4 w-4" />
						</Button>
						<Button variant="outline" size="lg">
							<Github class="mr-2 h-4 w-4" />
							Star on GitHub
						</Button>
					</div>
				</div>
			</div>
		</section>
	</main>

	<!-- Footer -->
	<footer class="bg-muted/30 py-12 border-t">
		<div class="container mx-auto px-4">
			<div class="flex flex-col md:flex-row justify-between items-center">
				<div class="flex items-center gap-2 mb-6 md:mb-0">
					<!-- Footer Logo -->
					<div class="relative h-6 w-6">
						<div class="absolute inset-0 bg-primary rounded-md"></div>
						<div
							class="absolute inset-[2px] bg-background rounded-sm flex items-center justify-center"
						>
							<div class="grid grid-cols-2 gap-[1px]">
								<div class="h-[4px] w-[4px] bg-primary rounded-sm"></div>
								<div class="h-[4px] w-[4px] bg-primary rounded-sm"></div>
								<div class="h-[4px] w-[4px] bg-primary rounded-sm"></div>
								<div class="h-[4px] w-[4px] bg-primary/50 rounded-sm"></div>
							</div>
						</div>
					</div>
					<span class="font-bold">Visitor Table</span>
				</div>

				<div class="flex gap-8 mb-6 md:mb-0">
					<a
						href="#features"
						class="text-sm text-muted-foreground hover:text-foreground transition-colors"
						>Features</a
					>
					<a
						href="#how-it-works"
						class="text-sm text-muted-foreground hover:text-foreground transition-colors"
						>How It Works</a
					>
					<a
						href="#contribute"
						class="text-sm text-muted-foreground hover:text-foreground transition-colors"
						>Contribute</a
					>
				</div>

				<div class="flex gap-4">
					<a href="#" class="text-muted-foreground hover:text-foreground transition-colors">
						<Github class="h-5 w-5" />
					</a>
					<a href="#" class="text-muted-foreground hover:text-foreground transition-colors">
						<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
							<path
								d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"
							/>
						</svg>
					</a>
					<a href="#" class="text-muted-foreground hover:text-foreground transition-colors">
						<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
							<path
								d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 0 1 1.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 0 0-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0 1 12 3.475zm-3.633.803a53.896 53.896 0 0 1 3.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 0 1 4.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 0 1-2.19-5.705zM12 20.547a8.482 8.482 0 0 1-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 0 1 1.823 6.475 8.4 8.4 0 0 1-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 0 1-3.655 5.715z"
							/>
						</svg>
					</a>
				</div>
			</div>

			<Separator class="my-8" />

			<div class="text-center text-sm text-muted-foreground">
				<p>© {new Date().getFullYear()} Visitor Table. Open Source Project.</p>
				<div class="flex justify-center gap-4 mt-2">
					<a href="#" class="hover:underline">License</a>
					<a href="#" class="hover:underline">Privacy Policy</a>
					<a href="#" class="hover:underline">Code of Conduct</a>
				</div>
			</div>
		</div>
	</footer>
</div>
