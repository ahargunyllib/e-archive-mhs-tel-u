import { useFlashMessages } from "../../hooks/use-flash-messages";
import { Toaster } from "../ui/sonner";

export default function RootLayout({
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
