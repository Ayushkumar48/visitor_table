import { db } from '$lib/server/db';
import { visitorEntries, visitors } from '$lib/server/db/schema';
import { desc, eq, sql } from 'drizzle-orm';
import type { VisitorEntry } from './columns';

export async function load() {
	const allVisitors = await db
		.select({
			id: visitorEntries.id,
			name: sql<string>`${visitors.firstname} || ' ' || ${visitors.lastname}`,
			phonenumber: visitors.phonenumber,
			visitorId: visitorEntries.visitorId,
			dateofvisit: visitorEntries.dateofvisit,
			intime: visitorEntries.dateofvisit,
			outtime: visitorEntries.outtime,
			reason: visitorEntries.reason,
			host: visitorEntries.host,
			vehiclenumber: visitorEntries.vehiclenumber,
			belongings: visitorEntries.belongings
		})
		.from(visitorEntries)
		.leftJoin(visitors, eq(visitorEntries.visitorId, visitors.id))
		.orderBy(desc(visitorEntries.dateofvisit));
	console.log(allVisitors);

	return {
		allVisitors: allVisitors.map((v) => ({
			...v,
			name: v.name
		})) as VisitorEntry[]
	};
}
