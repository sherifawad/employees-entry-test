import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "src/lib/utils";
import { Button } from "src/components/ui/button";
import { Calendar } from "src/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "src/components/ui/popover";
type Props = {
	date: Date | undefined;
	onDateSelect: (dateValue: Date | undefined) => void;
};

function DatePicker({ date, onDateSelect }: Props) {
	const [open, setOpen] = React.useState(false);
	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant={"outline"}
					className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
				>
					<CalendarIcon className="w-4 h-4 mr-2" />
					{date ? format(date, "PPP") : <span>Pick a date</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0">
				<Calendar
					mode="single"
					selected={date}
					onSelect={(d) => {
						onDateSelect(d);
						setOpen(false);
					}}
					initialFocus
				/>
			</PopoverContent>
		</Popover>
	);
}

export default DatePicker;
