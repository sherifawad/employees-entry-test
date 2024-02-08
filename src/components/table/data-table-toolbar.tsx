import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "src/components/ui/button";
import { Input } from "src/components/ui/input";

import { JobCode, statuses } from "../../data";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { DataTableViewOptions } from "./data-table-view-options";

interface DataTableToolbarProps<TData> {
	table: Table<TData>;
}

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
	const isFiltered = table.getState().columnFilters.length > 0;

	return (
		<div className="flex items-center justify-between">
			<div className="flex items-center flex-1 space-x-2">
				<Input
					placeholder="Filter by Name..."
					value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
					onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
					className="h-8 w-[150px] lg:w-[250px]"
				/>
				{table.getColumn("salaryStatus") && (
					<DataTableFacetedFilter column={table.getColumn("salaryStatus")} title="salaryStatus" options={statuses} />
				)}
				{table.getColumn("jobCode") && (
					<DataTableFacetedFilter
						column={table.getColumn("jobCode")}
						title="JobCode"
						options={[...JobCode].map((c) => ({ ...c, value: c.value + "" }))}
					/>
				)}
				{isFiltered && (
					<Button variant="ghost" onClick={() => table.resetColumnFilters()} className="h-8 px-2 lg:px-3">
						Reset
						<Cross2Icon className="w-4 h-4 ml-2" />
					</Button>
				)}
			</div>
			<DataTableViewOptions table={table} />
		</div>
	);
}
