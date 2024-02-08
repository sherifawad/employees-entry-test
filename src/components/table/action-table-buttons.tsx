import React from "react";
import { Employee, EmployeeContextType } from "src/types";
import { Button } from "../ui/button";
import { EmployeeContext } from "src/context/employeeContext";

type Props = {
	employee: Employee;
};

function EmployeeActions({ employee }: Props) {
	const { deleteEmployee } = React.useContext(EmployeeContext) as EmployeeContextType;

	return (
		<div className="flex items-center gap-x-2">
			<Button size={"sm"}>Edit</Button>
			<Button
				size={"sm"}
				variant={"destructive"}
				onClick={() => {
					deleteEmployee(employee.code!);
				}}
			>
				Delete
			</Button>
		</div>
	);
}

export default EmployeeActions;
