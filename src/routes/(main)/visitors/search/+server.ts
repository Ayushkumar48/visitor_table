import { db } from '$lib/server/db';
import { visitorEntries, visitors } from '$lib/server/db/schema';
import { eq, sql, like, or } from 'drizzle-orm';
import type { VisitorEntry } from '$lib/components/custom/data-table/columns';

export async function GET({ url }) {
	const q = url.searchParams.get('q')?.trim();
	let whereClause = undefined;

	if (q) {
		whereClause = or(
			like(sql<string>`${visitors.firstname} || ' ' || ${visitors.lastname}`, `%${q}%`),
			like(visitors.phonenumber, `%${q}%`),
			like(sql<string>`to_char(${visitorEntries.dateofvisit}, 'DD-MM-YYYY')`, `%${q}%`),
			like(sql<string>`to_char(${visitorEntries.dateofvisit}, 'MM-DD-YYYY')`, `%${q}%`),
			like(sql<string>`to_char(${visitorEntries.dateofvisit}, 'DD/MM/YYYY')`, `%${q}%`),
			like(sql<string>`to_char(${visitorEntries.dateofvisit}, 'MM/DD/YYYY')`, `%${q}%`),
			like(sql<string>`to_char(${visitorEntries.dateofvisit}, 'D Mon, YYYY')`, `%${q}%`),
			like(sql<string>`to_char(${visitorEntries.dateofvisit}, 'Mon D, YYYY')`, `%${q}%`),
			like(sql<string>`to_char(${visitorEntries.dateofvisit}, 'D Mon YYYY')`, `%${q}%`),
			like(sql<string>`to_char(${visitorEntries.dateofvisit}, 'DD Mon YYYY')`, `%${q}%`),
			like(sql<string>`to_char(${visitorEntries.dateofvisit}, 'DD Month YYYY')`, `%${q}%`),
			like(sql<string>`to_char(${visitorEntries.dateofvisit}, 'Month DD YYYY')`, `%${q}%`),
			like(sql<string>`to_char(${visitorEntries.dateofvisit}, 'Month D YYYY')`, `%${q}%`),
			like(visitorEntries.host, `%${q}%`)
		);
	}

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
		.where(whereClause);

	return new Response(
		JSON.stringify({
			allVisitors: allVisitors.map((v) => ({
				...v,
				name: v.name
			})) as VisitorEntry[]
		})
	);
}
