import { visitorSchema } from '$lib/client/schema';
import { redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load = async ({ locals }) => {
	if (!locals.user) {
		redirect(308, '/login');
	}
	return {
		form: await superValidate(zod(visitorSchema))
	};
};
