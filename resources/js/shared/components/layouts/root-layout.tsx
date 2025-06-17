import { useFlashMessages } from "../../hooks/use-flash-messages";
import { Toaster } from "../ui/sonner";

export default function RooutLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	useFlashMessages();

	return (
		<>
			{children}
			<Toaster richColors />
		</>
	);
}
