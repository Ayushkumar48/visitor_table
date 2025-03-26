<script lang="ts">
	import { loginSchema, type LoginSchema } from '$lib/client/schema';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { EyeOff, Eye } from 'lucide-svelte';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import * as Card from '$lib/components/ui/card/index.js';
	import { page } from '$app/state';
	let {
		data,
		login = $bindable()
	}: { data: { form: SuperValidated<Infer<LoginSchema>> }; login: boolean } = $props();

	const form = superForm(data.form, {
		validators: zodClient(loginSchema),
		onUpdate({ form }) {
			page.data.user = form.message.user;
		}
	});

	const { form: formData, enhance, message } = form;
	let showPassword = $state<boolean>(false);
</script>

<Card.Root class="w-[30rem] absolute  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
	<Card.Header>
		<Card.Title class="text-2xl">Welcome Back</Card.Title>
		<Card.Description>Please Sign in to your account</Card.Description>
	</Card.Header>
	<Card.Content>
		<form method="POST" use:enhance class="flex flex-col" action="?/login">
			<Form.Field {form} name="email">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Email</Form.Label>
						<Input {...props} bind:value={$formData.email} />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="password">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Password</Form.Label>
						<div class="relative">
							<Input
								{...props}
								bind:value={$formData.password}
								type={showPassword ? 'text' : 'password'}
							/>
							<Button
								variant="ghost"
								class="absolute right-0 top-1/2 -translate-y-1/2"
								type="button"
								onclick={() => {
									showPassword = !showPassword;
								}}
							>
								{#if showPassword}
									<Eye class="h-4 w-4" />
								{:else}
									<EyeOff class="h-4 w-4" />
								{/if}
							</Button>
						</div>
					{/snippet}
				</Form.Control>

				<Form.FieldErrors />
			</Form.Field>

			<Form.Button class="my-4">Login</Form.Button>
		</form>
	</Card.Content>
	<Card.Footer>
		<div>
			Doesn't have an account yet, <Button
				class="px-0"
				variant="link"
				onclick={() => (login = !login)}
			>
				create one
			</Button>
		</div>
	</Card.Footer>
</Card.Root>
