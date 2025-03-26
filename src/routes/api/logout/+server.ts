import { deleteSessionTokenCookie, invalidateSession } from '$lib/server/auth';
import { json } from '@sveltejs/kit';
export async function GET(event) {
	if (!event.locals.session) {
		return json({ status: 401, message: 'Session Not Found' });
	}
	await invalidateSession(event.locals.session.id);
	deleteSessionTokenCookie(event);
	event.locals.user = null;
	return json({});
}
