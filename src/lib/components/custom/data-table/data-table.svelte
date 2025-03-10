<script lang="ts" generics="TData">
	import {
		type ColumnDef,
		getCoreRowModel,
		type SortingState,
		getSortedRowModel,
		type PaginationState,
		getPaginationRowModel,
		type ColumnFiltersState,
		getFilteredRowModel,
		type VisibilityState,
		type RowSelectionState
	} from '@tanstack/table-core';
	import { createSvelteTable, FlexRender } from '$lib/components/ui/data-table/index.js';
	import * as Table from '$lib/components/ui/table/index.js';
	import { type VisitorEntry } from './columns.js';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import SelectFilter from '$lib/components/custom/SelectFilter.svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';

	type DataTableProps = {
		columns: ColumnDef<VisitorEntry>[];
		data: VisitorEntry[];
	};

	let { data, columns }: DataTableProps = $props();

	const table = createSvelteTable({
		get data() {
			return data;
		},
		columns,
		state: {
			get pagination() {
				return pagination;
			},
			get sorting() {
				return sorting;
			},
			get columnFilters() {
				return columnFilters;
			},
			get columnVisibility() {
				return columnVisibility;
			},
			get rowSelection() {
				return rowSelection;
			}
		},
		onPaginationChange: (updater) => {
			if (typeof updater === 'function') {
				pagination = updater(pagination);
			} else {
				pagination = updater;
			}
		},
		onSortingChange: (updater) => {
			if (typeof updater === 'function') {
				sorting = updater(sorting);
			} else {
				sorting = updater;
			}
		},
		onColumnFiltersChange: (updater) => {
			if (typeof updater === 'function') {
				columnFilters = updater(columnFilters);
			} else {
				columnFilters = updater;
			}
		},
		onColumnVisibilityChange: (updater) => {
			if (typeof updater === 'function') {
				columnVisibility = updater(columnVisibility);
			} else {
				columnVisibility = updater;
			}
		},
		onRowSelectionChange: (updater) => {
			if (typeof updater === 'function') {
				rowSelection = updater(rowSelection);
			} else {
				rowSelection = updater;
			}
		},
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),

		getFilteredRowModel: getFilteredRowModel()
	});
	let pagination = $state<PaginationState>({ pageIndex: 0, pageSize: 12 });
	let sorting = $state<SortingState>([]);
	let columnFilters = $state<ColumnFiltersState>([]);
	let columnVisibility = $state<VisibilityState>({});
	let rowSelection = $state<RowSelectionState>({});
	let filter = $state('name');
</script>

<div class="mx-2">
	<div class="flex items-center py-4 gap-x-2">
		<Input
			placeholder="Filter..."
			value={(table.getColumn(filter)?.getFilterValue() as string) ?? ''}
			onchange={(e) => {
				table.getColumn(filter)?.setFilterValue(e.currentTarget.value);
			}}
			oninput={(e) => {
				table.getColumn(filter)?.setFilterValue(e.currentTarget.value);
			}}
			class="max-w-sm"
		/>
		<SelectFilter bind:filter />
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				{#snippet child({ props })}
					<Button {...props} variant="outline" class="ml-auto">Columns To Show</Button>
				{/snippet}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content align="end">
				{#each table.getAllColumns().filter((col) => col.getCanHide()) as column (column.id)}
					<DropdownMenu.CheckboxItem
						class="capitalize"
						bind:checked={() => column.getIsVisible(), (v) => column.toggleVisibility(!!v)}
					>
						{column.id}
					</DropdownMenu.CheckboxItem>
				{/each}
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</div>
	<div class="rounded-md border overflow-y-auto custom-scrollbar">
		<Table.Root class="min-w-full">
			<Table.Header>
				{#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
					<Table.Row>
						{#each headerGroup.headers as header (header.id)}
							<Table.Head>
								{#if !header.isPlaceholder}
									{#if header.column.id === 'select' || header.column.id === 'dateofvisit'}
										<FlexRender
											content={header.column.columnDef.header}
											context={header.getContext()}
										/>
									{:else if typeof header.column.columnDef.header === 'function'}
										{@html header.column.columnDef.header(header.getContext())}
									{:else if typeof header.column.columnDef.header === 'string'}
										{@html header.column.columnDef.header}
									{/if}
								{/if}
							</Table.Head>
						{/each}
					</Table.Row>
				{/each}
			</Table.Header>
			<Table.Body>
				{#each table.getRowModel().rows as row (row.id)}
					<Table.Row data-state={row.getIsSelected() && 'selected'}>
						{#each row.getVisibleCells() as cell (cell.id)}
							{#if cell.column.id === 'select'}
								<Table.Cell class="w-0">
									<FlexRender content={cell.column.columnDef.cell} context={cell.getContext()} />
								</Table.Cell>
							{:else}
								<Table.Cell class="w-[10ch] truncate">
									<Tooltip.Provider delayDuration={0} disableHoverableContent={true}>
										<Tooltip.Root delayDuration={100}>
											<Tooltip.Trigger>
												{#if typeof cell.column.columnDef.cell === 'function'}
													{@html cell.column.columnDef.cell(cell.getContext())}
												{:else if typeof cell.column.columnDef.cell === 'string'}
													{@html cell.column.columnDef.cell}
												{/if}
											</Tooltip.Trigger>
											<Tooltip.Content align="center" class="text-sm">
												{#if typeof cell.column.columnDef.cell === 'function'}
													{@html cell.column.columnDef.cell(cell.getContext())}
												{:else if typeof cell.column.columnDef.cell === 'string'}
													{@html cell.column.columnDef.cell}
												{/if}
											</Tooltip.Content>
										</Tooltip.Root>
									</Tooltip.Provider>
								</Table.Cell>
							{/if}
						{/each}
					</Table.Row>
				{:else}
					<Table.Row>
						<Table.Cell colspan={columns.length} class="h-24 text-center">No results.</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
	<div class="flex items-center justify-end space-x-2 py-4">
		<Button
			variant="outline"
			size="default"
			onclick={() => table.previousPage()}
			disabled={!table.getCanPreviousPage()}
		>
			Previous
		</Button>
		<Button
			variant="outline"
			size="default"
			onclick={() => table.nextPage()}
			disabled={!table.getCanNextPage()}
		>
			Next
		</Button>
	</div>
</div>

<style>
	.custom-scrollbar::-webkit-scrollbar {
		width: 7px;
		height: 8px;
	}

	.custom-scrollbar::-webkit-scrollbar-track {
		background: transparent;
	}

	.custom-scrollbar::-webkit-scrollbar-thumb {
		background: #888;
		border-radius: 4px;
	}
</style>
