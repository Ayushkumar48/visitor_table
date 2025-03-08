import { db } from '$lib/server/db/index.js';
import { visitors } from '$lib/server/db/schema.js';
import { eq } from 'drizzle-orm';

export async function GET({ request }) {
	const phonenumber = request.headers.get('phonenumber');
	if (phonenumber) {
		const [existingVisitor] = await db
			.select()
			.from(visitors)
			.where(eq(visitors.phonenumber, phonenumber));
		return new Response(JSON.stringify({ existingVisitor }), {
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}
	return new Response(null, { status: 204 });
}
