import React from "react";
import EmployeesList from "./table/employees-list";
import { EmployeeContext } from "src/context/employeeContext";
import { EmployeeContextType } from "src/types";

function FilteredList() {
	const { employees } = React.useContext(EmployeeContext) as EmployeeContextType;

	return (
		<section>
			<EmployeesList employeesList={employees} />
		</section>
	);
}

export default FilteredList;
