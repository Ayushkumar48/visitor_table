import { hash, verify } from '@node-rs/argon2';
import { fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import type { Actions, PageServerLoad } from './$types';
import { message, superValidate } from 'sveltekit-superforms';
import { loginSchema, signupSchema } from '$lib/client/schema';
import { zod } from 'sveltekit-superforms/adapters';
import {
	createSession,
	generateSessionToken,
	generateUserId,
	setSessionTokenCookie
} from '$lib/server/auth';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) {
		redirect(308, '/visitors');
	}
	return {
		signup: await superValidate(zod(signupSchema)),
		login: await superValidate(zod(loginSchema))
	};
};

export const actions: Actions = {
	login: async (event) => {
		const form = await superValidate(event, zod(loginSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		try {
			const [existingUser] = await db.select().from(users).where(eq(users.email, form.data.email));
			if (!existingUser) {
				return message(form, 'User already exists with this email.', {
					status: 409
				});
			}
			const validPassword = await verify(existingUser.password, form.data.password, {
				memoryCost: 19456,
				timeCost: 3,
				outputLen: 32,
				parallelism: 1
			});
			if (!validPassword) {
				return message(form, 'Invalid Credentials', {
					status: 401
				});
			}
			const sessionToken = generateSessionToken();
			const session = await createSession(sessionToken, existingUser.id);
			setSessionTokenCookie(event, sessionToken, session.expiresAt);

			return message(form, { user: { ...existingUser, password: null } });
		} catch (error) {
			console.error(error);
			return message(form, 'An error has occurred.', {
				status: 500
			});
		}
	},
	signup: async (event) => {
		const form = await superValidate(event, zod(signupSchema));
		if (!form.valid) {
			return message(form, 'Please resolve the errors.', { status: 401 });
		}
		try {
			const [existingUser] = await db.select().from(users).where(eq(users.email, form.data.email));
			if (existingUser) {
				return message(form, 'User already exists with this email.', {
					status: 409
				});
			}
			const userId = generateUserId();
			const passwordHash = await hash(form.data.password as string, {
				memoryCost: 19456,
				timeCost: 3,
				outputLen: 32,
				parallelism: 1
			});
			const [userData] = await db
				.insert(users)
				.values({ ...form.data, id: userId, password: passwordHash })
				.returning();
			const sessionToken = generateSessionToken();
			const session = await createSession(sessionToken, userId);
			setSessionTokenCookie(event, sessionToken, session.expiresAt);

			return message(form, { user: { ...userData, password: null } });
		} catch (error) {
			console.error(error);
			return message(form, 'An error has occurred.', {
				status: 500
			});
		}
	}
};
