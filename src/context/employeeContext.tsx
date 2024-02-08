import React from "react";
import { Employee, EmployeeContextType, UpdatedEmployee, employeeFilter } from "src/types";

export const EmployeeContext = React.createContext<EmployeeContextType | null>(null);

const EmployeeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [employees, setEmployees] = React.useState<Employee[]>([
		{
			name: "Gerrie Dod",
			code: 1,
			salaryStatus: "not-valid",
			hiringDate: new Date("8/6/2023"),
			jobCode: 100,
		},
		{
			name: "Syd Neame",
			code: 2,
			salaryStatus: "not-valid",
			hiringDate: new Date("12/10/2021"),
			jobCode: 1,
		},
		{
			name: "Gwennie Templeton",
			code: 3,
			salaryStatus: "not-valid",
			hiringDate: new Date("5/20/2023"),
			jobCode: 2,
		},
		{
			name: "Ajay Cristofaro",
			code: 4,
			salaryStatus: "not-valid",
			hiringDate: new Date("5/31/2022"),
			jobCode: 3,
		},
		{
			name: "Waylen Downse",
			code: 5,
			salaryStatus: "not-valid",
			hiringDate: new Date("10/9/2021"),
			jobCode: 2,
		},
		{
			name: "Ginger Forlonge",
			code: 6,
			salaryStatus: "valid",
			hiringDate: new Date("8/5/2021"),
			jobCode: 3,
		},
		{
			name: "Jacobo Parmiter",
			code: 7,
			salaryStatus: "not-valid",
			hiringDate: new Date("8/16/2021"),
			jobCode: 1,
		},
		{
			name: "Lannie Bonifant",
			code: 8,
			salaryStatus: "valid",
			hiringDate: new Date("7/23/2021"),
			jobCode: 1,
		},
		{
			name: "Temple Paddick",
			code: 9,
			salaryStatus: "valid",
			hiringDate: new Date("1/22/2024"),
			jobCode: 1,
		},
		{
			name: "Trudi Aikin",
			code: 10,
			salaryStatus: "valid",
			hiringDate: new Date("3/19/2023"),
			jobCode: 2,
		},
		{
			name: "Rey Pinch",
			code: 11,
			salaryStatus: "valid",
			hiringDate: new Date("8/22/2022"),
			jobCode: 2,
		},
		{
			name: "Ezechiel Logsdale",
			code: 12,
			salaryStatus: "not-valid",
			hiringDate: new Date("10/5/2023"),
			jobCode: 2,
		},
		{
			name: "Legra Ladloe",
			code: 13,
			salaryStatus: "valid",
			hiringDate: new Date("7/27/2023"),
			jobCode: 3,
		},
		{
			name: "Brooks Sands-Allan",
			code: 14,
			salaryStatus: "not-valid",
			hiringDate: new Date("7/16/2022"),
			jobCode: 3,
		},
		{
			name: "Dirk Tytterton",
			code: 15,
			salaryStatus: "not-valid",
			hiringDate: new Date("5/3/2022"),
			jobCode: 3,
		},
		{
			name: "Haleigh Jills",
			code: 16,
			salaryStatus: "valid",
			hiringDate: new Date("11/9/2023"),
			jobCode: 3,
		},
		{
			name: "Burt Ellerker",
			code: 17,
			salaryStatus: "not-valid",
			hiringDate: new Date("5/30/2022"),
			jobCode: 3,
		},
		{
			name: "Hedvige Noe",
			code: 18,
			salaryStatus: "not-valid",
			hiringDate: new Date("7/6/2021"),
			jobCode: 100,
		},
		{
			name: "Lelia Mote",
			code: 19,
			salaryStatus: "valid",
			hiringDate: new Date("11/17/2022"),
			jobCode: 100,
		},
		{
			name: "Henderson Eeles",
			code: 20,
			salaryStatus: "valid",
			hiringDate: new Date("9/11/2022"),
			jobCode: 1,
		},
	]);
	const saveEmployee = (employee: Employee) => {
		setEmployees([...employees, employee]);
	};
	const updateEmployee = (code: number, data: UpdatedEmployee) => {
		setEmployees((prev) =>
			prev.map((e) => {
				if (e.code === code) {
					return {
						...e,
						...data,
					};
				}
				return e;
			})
		);
	};

	const deleteEmployee = (code: number) => {
		setEmployees((prev) => prev.filter((e) => e.code !== code));
	};
	const findUniqueEmployee = (code: number) => employees.find((e) => e.code === code);
	const findEmployee = (filters: Partial<employeeFilter>) => {
		const list = employees.filter((i) => Object.entries(filters).every(([k, v]) => i[k as keyof Employee] === v));
		if (list.length > 0) return list[0];
		return undefined;
	};
	const filterEmployeesList = (filters: Partial<employeeFilter>) =>
		employees.filter((i) => Object.entries(filters).every(([k, v]) => i[k as keyof Employee] === v));
	return (
		<EmployeeContext.Provider
			value={{
				employees,
				saveEmployee,
				updateEmployee,
				deleteEmployee,
				filterEmployeesList,
				findUniqueEmployee,
				findEmployee,
			}}
		>
			{children}
		</EmployeeContext.Provider>
	);
};

export default EmployeeProvider;
