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
		enableHiding: false,
		size: 40
	},
	{
		accessorKey: 'name',
		header: 'Name',
		size: 150,
		cell: (info) => `<div style="text-align: center;">${info.getValue()}</div>`
	},
	{
		accessorKey: 'phonenumber',
		header: 'Phone Number',
		size: 120,
		cell: (info) => `<div style="text-align: center;">${info.getValue()}</div>`
	},
	{
		accessorKey: 'dateofvisit',
		header: ({ column }) =>
			renderComponent(DataTableDateofvisitButton, {
				onclick: () => column.toggleSorting(column.getIsSorted() === 'asc')
			}),
		cell: (info) => {
			return `
                <div style="text-align: center;">
                    ${new Date(info.getValue() as string).toLocaleDateString('en-IN', {
											month: 'short',
											day: 'numeric',
											year: 'numeric',
											timeZone: 'Asia/Kolkata'
										})}
                </div>
            `;
		},
		size: 100
	},
	{
		accessorKey: 'intime',
		header: 'In Time',
		cell: (info) => {
			return `<div style="text-align: center;">${new Date(
				info.getValue() as string
			).toLocaleTimeString('en-US', {
				hour: 'numeric',
				minute: '2-digit',
				hour12: true
			})}</div>`;
		},
		size: 80
	},
	{
		accessorKey: 'outtime',
		header: 'Out Time',
		cell: (info) => {
			return `<div style="text-align: center;">${
				info.getValue()
					? new Date(info.getValue() as string).toLocaleTimeString('en-US', {
							hour: 'numeric',
							minute: '2-digit',
							hour12: true
						})
					: 'No Exit Entry'
			}</div>`;
		},
		size: 80
	},
	{
		accessorKey: 'reason',
		header: 'Reason',
		size: 200,
		cell: (info) => `<div style="text-align: center;">${info.getValue()}</div>`
	},
	{
		accessorKey: 'host',
		header: 'Host',
		size: 120,
		cell: (info) => `<div style="text-align: center;">${info.getValue()}</div>`
	},
	{
		accessorKey: 'vehiclenumber',
		header: 'Vehicle Number',
		size: 120,
		cell: (info) => `<div style="text-align: center;">${info.getValue() || '—'}</div>`
	},
	{
		accessorKey: 'belongings',
		header: 'Belongings',
		size: 200,
		cell: (info) => `<div style="text-align: center;">${info.getValue() || '—'}</div>`
	}
];
