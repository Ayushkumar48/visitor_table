import { renderComponent } from '$lib/components/ui/data-table';
import type { ColumnDef } from '@tanstack/table-core';
import DataTableDateofvisitButton from './data-table-dateofvisit-button.svelte';
import { Checkbox } from '$lib/components/ui/checkbox/index.js';

export type VisitorEntry = {
	id: string;

	name: string;

	phonenumber: string;

	visitorId: string;

	dateofvisit: Date;

	intime: Date;

	outtime: Date | null;

	reason: string;

	host: string;

	vehiclenumber: string | null;

	belongings: string | null;
};

export const columns: ColumnDef<VisitorEntry>[] = [
	{
		id: 'select',
		header: ({ table }) =>
			renderComponent(Checkbox, {
				checked: table.getIsAllPageRowsSelected(),
				indeterminate: table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected(),
				onCheckedChange: (value) => table.toggleAllPageRowsSelected(!!value),
				'aria-label': 'Select all'
			}),
		cell: ({ row }) =>
			renderComponent(Checkbox, {
				checked: row.getIsSelected(),
				onCheckedChange: (value) => row.toggleSelected(!!value),
				'aria-label': 'Select row'
			}),
		enableSorting: false,
		enableHiding: false
	},

	{
		accessorKey: 'name',

		header: 'Name'
	},

	{
		accessorKey: 'phonenumber',

		header: 'Phone Number'
	},

	{
		accessorKey: 'dateofvisit',
		header: ({ column }) =>
			renderComponent(DataTableDateofvisitButton, {
				onclick: () => column.toggleSorting(column.getIsSorted() === 'asc')
			}),

		cell: (info) =>
			new Date(info.getValue() as string).toLocaleDateString('en-US', {
				month: 'short',

				day: 'numeric',

				year: 'numeric'
			})
	},

	{
		accessorKey: 'intime',

		header: 'In Time',
		cell: (info) =>
			new Date(info.getValue() as string).toLocaleTimeString('en-US', {
				hour: 'numeric',
				minute: '2-digit',
				hour12: true
			})
	},

	{
		accessorKey: 'outtime',

		header: 'Out Time',
		cell: (info) =>
			info.getValue()
				? new Date(info.getValue() as string).toLocaleTimeString('en-US', {
						hour: 'numeric',
						minute: '2-digit',
						hour12: true
					})
				: 'No Exit Entry'
	},

	{
		accessorKey: 'reason',

		header: 'Reason'
	},

	{
		accessorKey: 'host',

		header: 'Host'
	},

	{
		accessorKey: 'vehiclenumber',

		header: 'Vehicle Number'
	},

	{
		accessorKey: 'belongings',

		header: 'Belongings'
	}
];
