import React from "react";
import { Employee } from "src/types";
import { columns } from "./columns";
import { DataTable } from "./data-table";

type Props = {
	employeesList: Employee[];
};

function EmployeesList({ employeesList }: Props) {
	return <DataTable columns={columns} data={employeesList} />;
}

export default EmployeesList;
