import { PersistedState } from 'runed';
type UserType = {
	id: string;
	firstname: string;
	lastname: string;
	email: string;
	phonenumber: string;
	password: null;
	age: number | null;
	address: string;
	image: string | null;
	approved: boolean | null;
	createdAt: Date;
} | null;

export const user = new PersistedState<UserType>('user', null);
