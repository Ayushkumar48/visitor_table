<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { MenuButton } from '$lib/components/ui/sidebar';
	import { CirclePlus } from '@lucide/svelte';
	import SuperDebug, { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { type VisitorSchema, visitorSchema } from '$lib/client/schema';
	import VisitorForm from './VisitorForm.svelte';

	import {
		Account,
		AddInformation,
		AdditionalDetails,
		AdditionalDetails2,
		AdditionalInformation,
		PersonalInfo
	} from '$lib/assets/illustrations/index';
	import EasyFileSearch from '$lib/assets/illustrations/EasyFileSearch.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import type { Visitor } from '$lib/server/db/schema';
	import { toast } from 'svelte-sonner';

	let { data }: { data: { form: SuperValidated<Infer<VisitorSchema>> } } = $props();
	const form = superForm(data.form, {
		validators: zodClient(visitorSchema),
		onResult: ({ result }) => {
			if (result.status === 200) {
				showForm = false;
				openDialog = false;
				currentStep = 0;
				visitorCheckNumber = '';
				form.reset();
			}
		}
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
			showForm = true;
		} else {
			showForm = true;
			toast.info('Visitor not found. Please fill in the details.');
		}
	}
	let openDialog = $state(false);
</script>

<Dialog.Root bind:open={openDialog}>
	<MenuButton onclick={() => (openDialog = !openDialog)}>
		<CirclePlus /><span>Add New Visitor</span>
	</MenuButton>

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
		<SuperDebug data={$formData} />
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
				<VisitorForm {form} {formData} {enhance} />
			</div>
		</Dialog.Content>
	{/if}
</Dialog.Root>
