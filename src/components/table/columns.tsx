import { ColumnDef } from "@tanstack/react-table";
import { Employee } from "src/types";
import EmployeeActions from "./action-table-buttons";
import { DataTableColumnHeader } from "./data-table-column-header";
import { Timer } from "lucide-react";
import { DataTableColumnFilterHeader } from "./data-table-column-header-filter";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Employee>[] = [
	{
		accessorKey: "code",
		header: ({ column }) => <DataTableColumnFilterHeader column={column} title="Code" />,
		cell: ({ row }) => <div className="text-center w-[50px]">{row.getValue("code")}</div>,
		// enableSorting: false,
		enableHiding: false,
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id));
		},
	},
	{
		accessorKey: "name",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
		cell: ({ row }) => <div className="">{row.getValue("name")}</div>,
		// enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "salaryStatus",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Salary Status" />,
		cell: ({ row }) => <div className="text-center w-[70px]">{row.getValue("salaryStatus")}</div>,
		// enableSorting: false,
		// enableHiding: false,
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id));
		},
	},
	{
		accessorKey: "jobCode",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Job Code" />,
		cell: ({ row }) => <div className="text-center w-[70px]">{row.getValue("jobCode")}</div>,
		// enableSorting: false,
		// enableHiding: false,
	},

	{
		accessorKey: "hiringDate",
		header: ({ column }) => <DataTableColumnHeader column={column} title="hiringDate" />,
		cell: ({ row }) => {
			const rowDate = row.getValue("hiringDate") as Date;
			if (!rowDate) {
				return null;
			}
			const placeTime = new Intl.DateTimeFormat("en-GB").format(rowDate);
			return (
				<div className="flex w-[100px] items-center">
					<Timer className="w-4 h-4 mr-2 text-muted-foreground" />
					<time suppressHydrationWarning>{placeTime}</time>
				</div>
			);
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id));
		},
	},
	// {
	// 	id: "actions",
	// 	cell: ({ row }) => {
	// 		const employee = row.original;

	// 		return <EmployeeActions employee={employee} />;
	// 	},
	// },
];
