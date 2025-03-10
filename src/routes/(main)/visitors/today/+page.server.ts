import { db } from '$lib/server/db';
import { visitorEntries, visitors } from '$lib/server/db/schema';
import { eq, sql } from 'drizzle-orm';
import type { VisitorEntry } from '$lib/components/custom/data-table/columns';

export async function load() {
	const nowUtc = new Date();
	const istOffset = 330;
	const nowIst = new Date(nowUtc.getTime() + istOffset * 60000);
	const todayIst = new Date(nowIst.getFullYear(), nowIst.getMonth(), nowIst.getDate());
	const todayISO = todayIst.toISOString().split('T')[0];

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
		.where(
			eq(
				sql`date_trunc('day', ${visitorEntries.dateofvisit} AT TIME ZONE 'Asia/Kolkata')`,
				sql`${todayISO}::date`
			)
		);

	return {
		allVisitors: allVisitors.map((v) => ({
			...v,
			name: v.name
		})) as VisitorEntry[]
	};
}
