import * as React from "react";

import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import ComboBox from "./comboBox";
import DatePicker from "./datePicker";
import { Employee, EmployeeContextType, SalaryStatus } from "src/types";
import { useKeyPress } from "src/hooks/useKeyPress";
import { CommandShortcut } from "./ui/command";
import EmployeeCodeSearch from "./employee-code-button";
import { EmployeeContext } from "src/context/employeeContext";
import { JobCode } from "src/data";

const defaultVales: Employee = {
	code: undefined,
	hiringDate: new Date(),
	name: "",
	salaryStatus: "valid",
	jobCode: undefined,
};

type Props = {
	employee?: Employee;
};

export function CardWithForm({ employee }: Props) {
	const { saveEmployee, employees, findUniqueEmployee, updateEmployee } = React.useContext(
		EmployeeContext
	) as EmployeeContextType;
	const [data, setData] = React.useState<Employee>(employee ? employee : defaultVales);
	const [editMode, setEditMode] = React.useState<boolean>(false);

	useKeyPress(() => {
		const employeesByHighestCode = employees.sort((a, b) => b.code! - a.code!);
		setData({ ...defaultVales, code: employeesByHighestCode[0].code! + 1 });
	}, ["F8"]);

	const onEditEmployee = (code: number) => {
		const employee = findUniqueEmployee(code);
		if (!employee) return;
		setData(employee);
		setEditMode(true);
	};

	const onDateSelect = (dateValue: Date | undefined) => setData((prev) => ({ ...prev, hiringDate: dateValue }));
	const onJobCodeSelect = (code: number) => {
		if (!isNaN(code)) setData((prev) => ({ ...prev, jobCode: code }));
	};

	const onSubmitHandler: React.FormEventHandler = (e) => {
		e.preventDefault();
		if (!data.code || !data.name || data.name.length < 1) return;
		if (editMode) {
			const { code, ...rest } = data;
			updateEmployee(code, rest);
		} else {
			const notValidEmployerCode = employees.some((e) => e.code === data.code) || data.code < 0;
			if (notValidEmployerCode) return;
			saveEmployee(data);
		}
		setData((prev) => defaultVales);
	};

	return (
		<Card className="w-[350px] mx-auto">
			<CardHeader>
				<CardTitle className="capitalize">employee files Entry</CardTitle>
				<CardDescription>
					<div className="flex items-center justify-between">
						<p>Deploy your new Employee Data.</p>
						<EmployeeCodeSearch editEmployee={onEditEmployee} />
					</div>
				</CardDescription>
			</CardHeader>
			<form onSubmit={onSubmitHandler}>
				<CardContent>
					<div className="grid items-center w-full gap-4">
						<div className="flex flex-col space-y-1.5">
							<Label htmlFor="code">Employee code</Label>
							<div className="flex items-center justify-between space-x-2">
								<Input
									id="code"
									placeholder="Code of the Employee"
									value={data.code || ""}
									onChange={(e) => setData((prev) => ({ ...prev, code: +e.target.value }))}
									type="number"
									required
								/>
								<CommandShortcut>⌘F8</CommandShortcut>
							</div>
						</div>
						<div className="flex flex-col space-y-1.5">
							<Label htmlFor="name">Employee name</Label>
							<Input
								id="name"
								placeholder="Name of the Employee"
								value={data.name}
								onChange={(e) => setData((prev) => ({ ...prev, name: e.target.value }))}
								required
							/>
						</div>
						<div className="flex flex-col space-y-1.5">
							<Label htmlFor="status">Salary status</Label>
							<Select
								defaultValue={data.salaryStatus}
								onValueChange={(value) => setData((prev) => ({ ...prev, salaryStatus: value as SalaryStatus }))}
							>
								<SelectTrigger id="status">
									<SelectValue placeholder="Select" />
								</SelectTrigger>
								<SelectContent position="popper">
									<SelectItem value="valid">Valid</SelectItem>
									<SelectItem value="not-valid">Not Valid</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className="flex flex-col space-y-1.5">
							<Label htmlFor="jobCode">Job</Label>

							<ComboBox options={JobCode} selectedValue={data.jobCode} onSelection={onJobCodeSelect} />
						</div>
						<div className="flex flex-col space-y-1.5">
							<Label htmlFor="hire-date">Date of Hiring</Label>
							<DatePicker date={data.hiringDate} onDateSelect={onDateSelect} />
						</div>
					</div>
				</CardContent>
				<CardFooter className="flex justify-between">
					<Button
						type="button"
						variant="outline"
						onClick={() => {
							setEditMode(false);
							setData(defaultVales);
						}}
					>
						Cancel
					</Button>
					<Button type="submit">{editMode ? "Edit" : "Create"}</Button>
				</CardFooter>
			</form>
		</Card>
	);
}
