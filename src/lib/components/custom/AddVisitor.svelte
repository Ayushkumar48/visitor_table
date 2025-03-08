<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { MenuButton } from '$lib/components/ui/sidebar';
	import { CirclePlus } from '@lucide/svelte';
	import * as Form from '$lib/components/ui/form/index.js';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { type VisitorSchema, visitorSchema } from '$lib/client/schema';
	import * as Select from '$lib/components/ui/select/index';
	import { Textarea } from '$lib/components/ui/textarea/index';
	import {
		Account,
		AddInformation,
		AdditionalDetails,
		AdditionalDetails2,
		AdditionalInformation,
		PersonalInfo
	} from '$lib/assets/illustrations/index';
	import DatePicker from './DatePicker.svelte';
	import EasyFileSearch from '$lib/assets/illustrations/EasyFileSearch.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import type { Visitor } from '$lib/server/db/schema';
	import { cn } from '$lib/utils';

	let { data } = $props<{ data: { form: SuperValidated<Infer<VisitorSchema>> } }>();
	const form = superForm(data.form, {
		validators: zodClient(visitorSchema)
	});
	const { form: formData, enhance } = form;
	const formSteps = ['Personal Information', 'Visit Information', 'Additional Details'];
	let currentStep = $state<number>(0);
	let showForm = $state(false);
	let visitorCheckNumber = $state<string>('');

	async function checkVisitor() {
		const response = await fetch('/api/addvisitor', {
			method: 'GET',

			headers: {
				phoneNumber: visitorCheckNumber
			}
		});
		const existingVisitor: Visitor = await response.json();
		console.log(existingVisitor === null, existingVisitor === undefined);
		if (existingVisitor && existingVisitor.id) {
			$formData.firstname = existingVisitor.firstname;
			$formData.lastname = existingVisitor.lastname || '';
			$formData.phonenumber = existingVisitor.phonenumber;
			$formData.email = existingVisitor.email || '';
			$formData.address = existingVisitor.address;
			$formData.age = existingVisitor.age;
			$formData.gender = existingVisitor.gender;
			$formData.governmentidtype = existingVisitor.governmentidtype;
			$formData.governmentidnumber = existingVisitor.governmentidnumber;
		}
		showForm = true;
	}
</script>

<Dialog.Root>
	<Dialog.Trigger class="w-full">
		<MenuButton>
			<CirclePlus /><span>Add New Visitor</span>
		</MenuButton>
	</Dialog.Trigger>

	{#if !showForm}
		<Dialog.Content class="sm:min-w-[600px] flex">
			<div class="w-1/3 flex flex-col justify-between">
				<EasyFileSearch class="w-40 h-40" />
			</div>
			<div class="w-2/3 flex flex-col">
				<Dialog.Header>
					<Dialog.Title>Visitor Exists</Dialog.Title>

					<Dialog.Description>Check if Vistor's data already exists.</Dialog.Description>
				</Dialog.Header>
				<div class="flex flex-col gap-4 mt-8">
					<Label>Enter visitor's phone number</Label>

					<Input bind:value={visitorCheckNumber} placeholder="phone number" name="phonenumber" />
					<div class="w-full flex justify-end">
						<Button onclick={checkVisitor}>Search</Button>
					</div>
				</div>
			</div>
		</Dialog.Content>
	{:else}
		<Dialog.Content class="sm:min-w-[900px] h-[550px] flex">
			<div class="w-1/3 flex flex-col justify-between">
				{#if formSteps[currentStep] === 'Personal Information'}
					<PersonalInfo class="w-40 h-40" />

					<Account class="w-40 h-40" />
				{:else if formSteps[currentStep] === 'Visit Information'}
					<AdditionalInformation class="w-40 h-40" />

					<AddInformation class="w-40 h-40" />
				{:else}
					<AdditionalDetails class="w-40 h-40" />

					<AdditionalDetails2 class="w-40 h-40" />
				{/if}
			</div>
			<div class="w-2/3 flex flex-col">
				<Dialog.Header>
					<Dialog.Title>Add Visitor</Dialog.Title>

					<Dialog.Description>
						Register a new visitor by adding their details here. Click 'Add' when you're finished.
					</Dialog.Description>
				</Dialog.Header>
				<form
					method="POST"
					use:enhance
					class="w-full flex flex-col justify-between flex-1 mt-2"
					action="/api/addvisitor"
				>
					<div class="space-y-4">
						<div class:hidden={formSteps[currentStep] !== 'Personal Information'}>
							<h4>{formSteps[currentStep]}</h4>
							<div class="w-full flex gap-x-2">
								<Form.Field {form} name="firstname" class="w-1/2">
									<Form.Control>
										{#snippet children({ props })}
											<Form.Label>First Name</Form.Label>

											<Input {...props} bind:value={$formData.firstname} />
										{/snippet}
									</Form.Control>

									<Form.FieldErrors />
								</Form.Field>

								<Form.Field {form} name="lastname" class="w-1/2">
									<Form.Control>
										{#snippet children({ props })}
											<Form.Label>Last Name</Form.Label>

											<Input {...props} bind:value={$formData.lastname} />
										{/snippet}
									</Form.Control>

									<Form.FieldErrors />
								</Form.Field>
							</div>
							<div class="flex gap-x-2">
								<Form.Field {form} name="phonenumber" class="w-1/2">
									<Form.Control>
										{#snippet children({ props })}
											<Form.Label>Phone Number</Form.Label>

											<Input {...props} bind:value={$formData.phonenumber} />
										{/snippet}
									</Form.Control>

									<Form.FieldErrors />
								</Form.Field>

								<Form.Field {form} name="email" class="w-1/2">
									<Form.Control>
										{#snippet children({ props })}
											<Form.Label
												>Email <span class="text-xs opacity-50 italic">(optional)</span></Form.Label
											>

											<Input {...props} bind:value={$formData.email} />
										{/snippet}
									</Form.Control>

									<Form.FieldErrors />
								</Form.Field>
							</div>
							<div class="flex gap-x-2">
								<Form.Field {form} name="age" class="w-1/2">
									<Form.Control>
										{#snippet children({ props })}
											<Form.Label>Age</Form.Label>

											<Input {...props} bind:value={$formData.age} type="number" />
										{/snippet}
									</Form.Control>

									<Form.FieldErrors />
								</Form.Field>

								<Form.Field {form} name="gender" class="w-1/2">
									<Form.Control>
										{#snippet children({ props })}
											<Form.Label>Gender</Form.Label>

											<Select.Root type="single" bind:value={$formData.gender} name={props.name}>
												<Select.Trigger {...props}
													>{$formData.gender
														? $formData.gender
														: 'Select your gender'}</Select.Trigger
												>

												<Select.Content>
													<Select.Item value="Male" label="Male" />

													<Select.Item value="Female" label="Female" />

													<Select.Item value="Prefer not to say" label="Prefer not to say" />
												</Select.Content>
											</Select.Root>
										{/snippet}
									</Form.Control>

									<Form.FieldErrors />
								</Form.Field>
							</div>
							<div class="flex gap-x-2">
								<Form.Field {form} name="governmentidtype" class="w-1/2">
									<Form.Control>
										{#snippet children({ props })}
											<Form.Label>Government ID Type</Form.Label>

											<Select.Root
												type="single"
												bind:value={$formData.governmentidtype}
												name={props.name}
											>
												<Select.Trigger {...props}
													>{$formData.governmentidtype
														? $formData.governmentidtype[0].toUpperCase() +
															$formData.governmentidtype.slice(1)
														: 'Select an ID'}</Select.Trigger
												>

												<Select.Content>
													{@const govIds = [
														'Aadhar Card',

														'PAN Card',

														'Voter Card',

														'Passport',

														'Driving License',

														'Ration card',

														'Student ID Card',

														'Employee ID Card',

														'Disabled ID Card',

														'Senior Citizen Card',

														'Armed Forces ID Card'
													]}

													{#each govIds as id}
														<Select.Item value={id} label={id} />
													{/each}
												</Select.Content>
											</Select.Root>
										{/snippet}
									</Form.Control>

									<Form.FieldErrors />
								</Form.Field>

								<Form.Field {form} name="governmentidnumber" class="w-1/2">
									<Form.Control>
										{#snippet children({ props })}
											<Form.Label>Government ID Number</Form.Label>

											<Input {...props} bind:value={$formData.governmentidnumber} />
										{/snippet}
									</Form.Control>

									<Form.FieldErrors />
								</Form.Field>
							</div>
						</div>
						<div class:hidden={formSteps[currentStep] !== 'Visit Information'}>
							<h4>{formSteps[currentStep]}</h4>
							<div class="flex gap-x-2">
								<Form.Field {form} name="address" class="w-1/2">
									<Form.Control>
										{#snippet children({ props })}
											<Form.Label>Current Address</Form.Label>

											<Input {...props} bind:value={$formData.address} />
										{/snippet}
									</Form.Control>

									<Form.FieldErrors />
								</Form.Field>

								<DatePicker bind:date={$formData.dateofvisit} {form} />
							</div>
							<div class="flex gap-x-2">
								<Form.Field {form} name="intime" class="w-1/2">
									<Form.Control>
										{#snippet children({ props })}
											<Form.Label>In Time</Form.Label>

											<Input {...props} bind:value={$formData.intime} type="time" />
										{/snippet}
									</Form.Control>

									<Form.FieldErrors />
								</Form.Field>

								<Form.Field {form} name="outtime" class="w-1/2">
									<Form.Control>
										{#snippet children({ props })}
											<Form.Label>Out Time</Form.Label>

											<Input {...props} bind:value={$formData.outtime} type="time" />
										{/snippet}
									</Form.Control>

									<Form.FieldErrors />
								</Form.Field>
							</div>
							<div class="flex gap-x-2">
								<Form.Field {form} name="host" class="w-1/2">
									<Form.Control>
										{#snippet children({ props })}
											<Form.Label>Host Person</Form.Label>

											<Input {...props} bind:value={$formData.host} />
										{/snippet}
									</Form.Control>

									<Form.FieldErrors />
								</Form.Field>

								<Form.Field {form} name="reason" class="w-1/2">
									<Form.Control>
										{#snippet children({ props })}
											<Form.Label>Reason for the visit</Form.Label>

											<Input {...props} bind:value={$formData.reason} />
										{/snippet}
									</Form.Control>

									<Form.FieldErrors />
								</Form.Field>
							</div>
						</div>
						<div class:hidden={formSteps[currentStep] !== 'Additional Details'}>
							<h4>{formSteps[currentStep]}</h4>

							<Form.Field {form} name="vehiclenumber">
								<Form.Control>
									{#snippet children({ props })}
										<Form.Label
											>Vehicle Number <span class="text-xs opacity-50 italic">(if any)</span
											></Form.Label
										>

										<Input {...props} bind:value={$formData.vehiclenumber} />
									{/snippet}
								</Form.Control>

								<Form.FieldErrors />
							</Form.Field>

							<Form.Field {form} name="belongings">
								<Form.Control>
									{#snippet children({ props })}
										<Form.Label
											>Belongings <span class="text-xs opacity-50 italic">(if any)</span
											></Form.Label
										>

										<Textarea {...props} bind:value={$formData.belongings} />
									{/snippet}
								</Form.Control>

								<Form.FieldErrors />
							</Form.Field>
						</div>
					</div>
					<div class="mt-2 flex justify-between items-center">
						<div>
							<Button
								onclick={() => currentStep--}
								disabled={currentStep === 0}
								variant="outline"
								class="w-24">Previous</Button
							>
						</div>
						<div class="text-sm text-gray-500">
							Step {currentStep + 1} of {formSteps.length}
						</div>
						<div>
							{#if currentStep === 2}
								<Form.Button class="w-24">Add</Form.Button>
							{:else}
								<Button onclick={() => currentStep++} class="w-24">Next</Button>
							{/if}
						</div>
					</div>
				</form>
			</div>
		</Dialog.Content>
	{/if}
</Dialog.Root>
