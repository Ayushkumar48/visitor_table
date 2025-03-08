import { pgTable, text, integer, timestamp, boolean, pgEnum } from 'drizzle-orm/pg-core';

export const genderEnum = pgEnum('gender', ['Male', 'Female', 'Prefer not to say']);

export const governmentIdTypeEnum = pgEnum('government_id_type', [
	'Aadhar Card',
	'PAN Card',
	'Voter Card',
	'Passport',
	'Driving License',
	'Ration card',
	'Student ID Card',
	'Employee ID Card',
	'Disabled ID Card',
	'Senior Citizen Card',
	'Armed Forces ID Card'
]);

export const users = pgTable('users', {
	id: text('id').primaryKey(),
	firstname: text('first_name').notNull(),
	lastname: text('last_name').notNull(),
	email: text('email').notNull().unique(),
	phonenumber: text('phone_number').notNull(),
	password: text('password_hash').notNull(),
	age: integer('age'),
	address: text('address').notNull(),
	approved: boolean('approved').default(false),
	image: text('image'),
	createdAt: timestamp('created_at').defaultNow().notNull()
});

export const sessions = pgTable('sessions', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => users.id),
	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull()
});

export const visitors = pgTable('visitors', {
	id: text('id').primaryKey(),
	firstname: text('firstname').notNull(),
	lastname: text('lastname'),
	phonenumber: text('phone_number').notNull().unique(),
	email: text('email'),
	address: text('address').notNull(),
	age: integer('age').notNull(),
	gender: genderEnum('gender').default('Male').notNull(),
	governmentidtype: governmentIdTypeEnum('government_id_type').default('Aadhar Card').notNull(),
	governmentidnumber: text('government_id_number').notNull()
});

export const visitorEntries = pgTable('visitor_entries', {
	id: text('id').primaryKey(),
	visitorId: text('visitor_id')
		.references(() => visitors.id)
		.notNull(),
	dateofvisit: text('date_of_visit').notNull(),
	intime: text('in_time').default('12:00').notNull(),
	outtime: text('out_time').default('12:00'),
	reason: text('reason').notNull(),
	host: text('host').notNull(),
	vehiclenumber: text('vehicle_number'),
	belongings: text('belongings')
});

export type Session = typeof sessions.$inferSelect;
export type User = typeof users.$inferSelect;
export type Visitor = typeof visitors.$inferSelect;
export type VisitorEntry = typeof visitorEntries.$inferSelect;
