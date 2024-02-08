import { CardWithForm } from "./components/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "src/components/ui/tabs";
import EmployeeProvider from "./context/employeeContext";
import FilteredList from "./components/filteredList";

function App() {
	return (
		<EmployeeProvider>
			<Tabs defaultValue="list" className="flex flex-col w-full px-4 py-12 mx-auto">
				<TabsList className="w-[400px] self-center  mb-12">
					<TabsTrigger value="new" className="w-full capitalize">
						employee files Entry
					</TabsTrigger>
					<TabsTrigger value="list" className="w-full capitalize">
						employee files Query
					</TabsTrigger>
				</TabsList>
				<TabsContent value="new">
					<CardWithForm />
				</TabsContent>
				<TabsContent value="list">
					<FilteredList />
				</TabsContent>
			</Tabs>
		</EmployeeProvider>
	);
}

export default App;
