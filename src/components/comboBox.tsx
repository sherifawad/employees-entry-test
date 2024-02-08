import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "src/lib/utils";
import { Button } from "src/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "src/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "src/components/ui/popover";
type Props = {
	options: {
		label: string;
		value: number;
	}[];

	selectedValue: number | undefined;
	onSelection: (selectedValue: number) => void;
};

function ComboBox({ options, selectedValue, onSelection }: Props) {
	const [open, setOpen] = React.useState(false);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button variant="outline" role="combobox" aria-expanded={open} className="justify-between w-full">
					{selectedValue
						? options.find((option) => option.value === selectedValue)?.label ?? "Select option..."
						: "Select option..."}
					<ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0">
				<Command>
					<CommandInput placeholder="Search option..." />
					<CommandEmpty>No option found.</CommandEmpty>
					<CommandGroup>
						{options.map((option) => (
							<CommandItem
								key={option.value}
								value={option.value + ""}
								onSelect={(currentValue) => {
									onSelection(+currentValue);
									setOpen(false);
								}}
							>
								<Check className={cn("mr-2 h-4 w-4", selectedValue === option.value ? "opacity-100" : "opacity-0")} />
								{option.label}
							</CommandItem>
						))}
					</CommandGroup>
				</Command>
			</PopoverContent>
		</Popover>
	);
}

export default ComboBox;
