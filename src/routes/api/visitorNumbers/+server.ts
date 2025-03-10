import { db } from '$lib/server/db';
import { visitorEntries } from '$lib/server/db/schema';
import { json } from '@sveltejs/kit';
import { count, eq, sql } from 'drizzle-orm';

export async function GET({ request }) {
	const targetDate = request.headers.get('targetDate');

	const result = await db
		.select({ count: count() })
		.from(visitorEntries)
		.where(eq(sql`DATE(${visitorEntries.dateofvisit})`, sql`${targetDate}::date`));

	let numberOfVisits = 0;

	if (result.length > 0 && result[0] && result[0].count !== null) {
		numberOfVisits = result[0].count;
	}

	return json(numberOfVisits);
}
