<script lang="ts">
	import { Input } from '$lib/components/ui/input/index';
	import { Label } from '$lib/components/ui/label/index';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import { Info, MoveLeft, Pencil, User } from '@lucide/svelte';
	import { onMount } from 'svelte';
	import { toast } from 'svelte-sonner';
	import { Button } from '$lib/components/ui/button';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	async function uploadImage(event: Event) {
		const input = event.target as HTMLInputElement;
		const file = input.files?.[0];

		if (file && page.data.user?.id) {
			const formData = new FormData();
			formData.append('image', file);
			formData.append('userId', page.data.user?.id);
			toast.promise(
				(async () => {
					const response = await fetch('/account', {
						method: 'POST',
						body: formData
					});
					if (!response.ok) {
						throw new Error('Image upload failed: ' + response.statusText);
					}

					await fetchImage();
					return { name: 'Image' };
				})(),
				{
					loading: 'Uploading...',
					success: (data) => `Image uploaded successfully!`,
					error: 'Failed to upload image. Try again!'
				}
			);
		}
	}
	let image: string | null = null;

	async function fetchImage() {
		if (page.data.user) {
			try {
				const res = await fetch(`/account/${page.data.user.id}`);
				if (res.ok) {
					const blob = await res.blob();
					image = URL.createObjectURL(blob);
				} else {
					console.error('Failed to fetch image:', res.statusText);
				}
			} catch (error) {
				console.error('Error fetching image:', error);
			}
		}
	}
	onMount(() => {
		fetchImage();
	});
</script>

<div class="m-8">
	<Button onclick={() => goto('/visitors')}><MoveLeft /> Back to Main</Button>
</div>
<div class="flex gap-x-4">
	<div class="flex mx-16 mt-8 mb-8 gap-x-2">
		<h3 class="text-xl font-semibold">Profile</h3>
		<Tooltip.Provider>
			<Tooltip.Root delayDuration={100}>
				<Tooltip.Trigger><Info class="w-5 h-5" /></Tooltip.Trigger>
				<Tooltip.Content>
					<p class="text-sm">User data can only be changed through admin.</p>
				</Tooltip.Content>
			</Tooltip.Root>
		</Tooltip.Provider>
	</div>
	<div class="w-96 flex items-center gap-x-4">
		<div class="relative">
			{#if image}
				<Dialog.Root>
					<Dialog.Trigger class="cursor-zoom-in">
						<img src={image} alt="person" class="h-16 w-16 rounded-full" />
					</Dialog.Trigger>
					<Dialog.Content class="p-12 w-auto">
						<img src={image} alt="person" class="h-72 w-72 rounded-sm" />
					</Dialog.Content>
				</Dialog.Root>
			{:else}
				<User class="h-14 w-14 rounded-full bg-gray-600 p-1" />
			{/if}
			<label for="picture" class="absolute bottom-0 right-0 cursor-pointer">
				<Pencil class="w-6 h-6 bg-gray-500 rounded-full p-0.5" />
			</label>
		</div>
	</div>
	<Input id="picture" type="file" class="w-60 hidden" accept="image/*" onchange={uploadImage} />
</div>
<div class="mx-16 flex flex-col gap-y-4 w-[32rem]">
	<div class="flex gap-x-2 text-nowrap items-center justify-between">
		<Label>First Name :</Label>
		<Input readonly value={page.data.user?.firstname} class="w-96" />
	</div>
	<div class="flex gap-x-2 text-nowrap items-center justify-between">
		<Label>Last Name :</Label>
		<Input readonly value={page.data.user?.lastname} class="w-96" />
	</div>
	<div class="flex gap-x-2 text-nowrap items-center justify-between">
		<Label>Email :</Label>
		<Input readonly value={page.data.user?.email} class="w-96" />
	</div>
	<div class="flex gap-x-2 text-nowrap items-center justify-between">
		<Label>Phone Number :</Label>
		<Input readonly value={page.data.user?.phonenumber} class="w-96" />
	</div>
	<div class="flex gap-x-2 text-nowrap items-center justify-between">
		<Label>Age :</Label>
		<Input readonly value={page.data.user?.age} class="w-96" />
	</div>
	<div class="flex gap-x-2 text-nowrap items-center justify-between">
		<Label>Address :</Label>
		<Input readonly value={page.data.user?.address} class="w-96" />
	</div>
</div>
