import { ReactNode } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "src/components/ui/dialog";

type Props = {
	triggerComponent: () => JSX.Element;
	children: ReactNode;
	title: string;
};

function PopUpDialogue({ triggerComponent, children, title }: Props) {
	return (
		<Dialog>
			<DialogTrigger asChild>{triggerComponent()}</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
				</DialogHeader>
				{children}
			</DialogContent>
		</Dialog>
	);
}

export default PopUpDialogue;
