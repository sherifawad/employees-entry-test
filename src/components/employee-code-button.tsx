import React, { FormEvent, useState } from "react";
import PopUpDialogue from "./popup-dialogue";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Employee, EmployeeContextType } from "src/types";
import { EmployeeContext } from "src/context/employeeContext";
import { DialogClose } from "src/components/ui/dialog";
import { Card, CardContent } from "./ui/card";
import { Separator } from "./ui/separator";

const CodeSearchTrigger = () => {
	return <Button>Search</Button>;
};

type Props = {
	editEmployee: (code: number) => void;
};

function EmployeeCodeSearch({ editEmployee }: Props) {
	const { filterEmployeesList, deleteEmployee } = React.useContext(EmployeeContext) as EmployeeContextType;
	const [employeeCodeSearch, setEmployeeCodeSearch] = useState<number | undefined>();
	const [list, setList] = useState<Employee[]>([]);

	const onDelete = (code: number) => {
		deleteEmployee(code);
		const filteredList = list.filter((e) => e.code !== code);
		if (filteredList.length < 1) {
			setEmployeeCodeSearch(undefined);
		}
		setList(filteredList);
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!employeeCodeSearch) return;
		const filteredList = filterEmployeesList({ code: employeeCodeSearch });
		setList(filteredList);
	};

	return (
		<PopUpDialogue title="Find Employee Using Code" triggerComponent={CodeSearchTrigger}>
			<div className="flex flex-col space-y-4">
				<form onSubmit={handleSubmit}>
					<div className="flex flex-col space-y-1.5">
						<Label htmlFor="code">Employee code</Label>
						<div className="flex items-center justify-between space-x-2">
							<Input
								id="code"
								name="code"
								placeholder="Code of the Employee"
								type="number"
								value={employeeCodeSearch || ""}
								onChange={(e) => setEmployeeCodeSearch(+e.target.value)}
								required
							/>
							<Button type="submit">S</Button>
						</div>
					</div>
				</form>
				<ul>
					{list.length < 1 && <p className="text-center">No Results.</p>}
					<Separator className="my-4" />
					{list.map((e) => (
						<li key={e.code}>
							<div className="grid grid-cols-[1fr_4fr_auto] px-4 items-center">
								<p>{e.code}</p>
								<p>{e.name}</p>
								<div className="flex items-center justify-between gap-x-3">
									<DialogClose
										className="inline-flex items-center justify-center h-10 px-4 py-2 text-sm font-medium transition-colors rounded-md bg-primary text-primary-foreground hover:bg-primary/90 whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
										onClick={() => {
											editEmployee(e.code!);
											setEmployeeCodeSearch(undefined);
											setList([]);
										}}
									>
										Edit
									</DialogClose>
									<Button type="button" size={"sm"} variant={"destructive"} onClick={() => onDelete(e.code!)}>
										Delete
									</Button>
								</div>
							</div>
							<Separator className="my-4" />
						</li>
					))}
				</ul>
			</div>
		</PopUpDialogue>
	);
}

export default EmployeeCodeSearch;
