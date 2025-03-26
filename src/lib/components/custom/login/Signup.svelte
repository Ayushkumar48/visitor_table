<script lang="ts">
	import { signupSchema, type SignupSchema } from '$lib/client/schema';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Eye, EyeOff } from '@lucide/svelte';
	import * as Card from '$lib/components/ui/card/index.js';

	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { page } from '$app/state';
	let {
		data,
		login = $bindable()
	}: { data: { form: SuperValidated<Infer<SignupSchema>> }; login: boolean } = $props();

	const form = superForm(data.form, {
		validators: zodClient(signupSchema),
		onUpdated({ form }) {
			page.data.user = form.message.user;
		}
	});

	const { form: formData, enhance } = form;
	let showPassword = $state(false);
</script>

<Card.Root class="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] absolute">
	<Card.Header>
		<Card.Title class="text-2xl">Start Your Journey</Card.Title>
		<Card.Description>Create your account</Card.Description>
	</Card.Header>
	<Card.Content>
		<form method="POST" use:enhance class="flex flex-col" action="?/signup">
			<div class="flex gap-x-4 w-full">
				<Form.Field {form} name="firstname" class="w-full">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>First Name</Form.Label>
							<Input {...props} bind:value={$formData.firstname} />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field {form} name="lastname" class="w-full">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Last Name</Form.Label>
							<Input {...props} bind:value={$formData.lastname} />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
			</div>
			<Form.Field {form} name="email">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Email</Form.Label>
						<Input {...props} bind:value={$formData.email} />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="phonenumber">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Phone Number</Form.Label>
						<Input {...props} bind:value={$formData.phonenumber} />
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
								onclick={() => (showPassword = !showPassword)}
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
			<div class="flex gap-x-4 w-full">
				<Form.Field {form} name="age" class="w-full">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label
								>Age
								<span class="text-xs opacity-50 italic">(optional)</span>
							</Form.Label>

							<Input {...props} bind:value={$formData.age} type="number" />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field {form} name="address" class="w-full">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Current Address</Form.Label>
							<Input {...props} bind:value={$formData.address} />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
			</div>
			<Form.Button class="my-4">Create Account</Form.Button>
		</form>
	</Card.Content>
	<Card.Footer>
		<div>
			Already have an account, <Button variant="link" class="px-0" onclick={() => (login = !login)}
				>login here</Button
			>
		</div>
	</Card.Footer>
</Card.Root>
