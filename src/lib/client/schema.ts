import { z } from 'zod';

export const signupSchema = z.object({
	email: z.string().email(),
	firstname: z.string().min(1, 'FirstName is required'),
	lastname: z.string().min(1, 'LastName is required'),
	password: z.string().min(8, {
		message: 'Password must contain at least 8 characters with at least 1 number and 1 alphabet.'
	}),
	phonenumber: z
		.string()
		.min(10, 'Please provide your phone number.')
		.max(10, 'Please provide your phone number.')
		.regex(/^\d+$/, 'Phone number must contain only digits.'),
	address: z.string().min(1, 'Please provide your current address.'),
	age: z
		.number()
		.min(1, 'Age should be between 1 and 120')
		.max(120, 'Age should be between 1 and 120')
		.optional()
});
export const loginSchema = z.object({
	email: z.string().email('Please enter a valid email.'),

	password: z.string().min(1, 'Password is required.')
});
export const visitorSchema = z.object({
	firstname: z.string().min(1, 'FirstName is required'),
	lastname: z.string().optional(),
	phonenumber: z
		.string()
		.min(10, 'Please provide your phone number.')
		.max(10, 'Please provide your phone number.')
		.regex(/^\d+$/, 'Phone number must contain only digits.'),
	email: z.string().email().optional(),
	address: z.string().min(1, 'Please provide your current address.'),
	age: z
		.number()
		.min(1, 'Age should be between 1 and 120')
		.max(120, 'Age should be between 1 and 120'),
	gender: z.enum(['Male', 'Female', 'Prefer not to say']),
	reason: z.string().min(1, 'Please provide the reason for the visit.'),
	host: z.string().min(1, 'Please specify the person you want to meet.'),
	governmentidtype: z.enum([
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
	]),
	governmentidnumber: z.string().min(1, 'Please provide card number'),
	vehiclenumber: z.string().optional(),
	belongings: z.string().optional()
});

export type SignupSchema = typeof signupSchema;
export type LoginSchema = typeof loginSchema;
export type VisitorSchema = typeof visitorSchema;
