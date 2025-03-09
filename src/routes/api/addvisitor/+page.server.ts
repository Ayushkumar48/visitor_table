import { visitorSchema } from '$lib/client/schema';
import { db } from '$lib/server/db/index.js';
import { visitorEntries, visitors } from '$lib/server/db/schema.js';
import { eq } from 'drizzle-orm';
import { superValidate, fail, message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(visitorSchema));
		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			const [existingVisitor] = await db
				.select()
				.from(visitors)
				.where(eq(visitors.phonenumber, form.data.phonenumber));
			let visitorId = '';
			if (!existingVisitor) {
				visitorId = crypto.randomUUID();
				await db.insert(visitors).values({
					id: visitorId,
					firstname: form.data.firstname,
					lastname: form.data.lastname,
					phonenumber: form.data.phonenumber,
					email: form.data.email,
					address: form.data.address,
					age: form.data.age,
					gender: form.data.gender,
					governmentidtype: form.data.governmentidtype,
					governmentidnumber: form.data.governmentidnumber
				});
			} else {
				visitorId = existingVisitor.id;
			}
			const visitorEntryId = crypto.randomUUID();
			await db.insert(visitorEntries).values({
				id: visitorEntryId,
				visitorId,
				reason: form.data.reason,
				host: form.data.host,
				vehiclenumber: form.data.vehiclenumber,
				belongings: form.data.belongings
			});

			return message(form, 'Visitor not found');
		} catch (error) {
			console.error(error);
			return message(form, 'An error occurred while submitting the form', {
				status: 500
			});
		}
	}
};
