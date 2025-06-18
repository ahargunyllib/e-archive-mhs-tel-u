import { buttonVariants } from "@/shared/components/ui/button";
import { Calendar } from "@/shared/components/ui/calendar";
import { cn } from "@/shared/lib/utils";
import { id } from "date-fns/locale";
import { useState } from "react";

export default function EventCalendarCard() {
	const events = [
		{
			title: "Team Sync Meeting",
			from: "2025-06-12T09:00:00",
			to: "2025-06-12T10:00:00",
		},
		{
			title: "Design Review",
			from: "2025-06-12T11:30:00",
			to: "2025-06-12T12:30:00",
		},
		{
			title: "Client Presentation",
			from: "2025-06-12T14:00:00",
			to: "2025-06-12T15:00:00",
		},
	];

	const [date, setDate] = useState<Date | undefined>(new Date());

	return (
		<div className="bg-white rounded-2xl p-6 border border-[#EAECF0] space-y-6 w-fit">
			<Calendar
				mode="single"
				selected={date}
				onSelect={setDate}
				required
				classNames={{
					day: cn(
						buttonVariants({ variant: "ghost" }),
						"size-12 p-0 font-normal aria-selected:opacity-100 aria-selected:bg-[#009180] aria-selected:text-[#F9FAFB]",
					),
					caption_label: "font-bold text-[#080C18]",
					head_cell: "text-[#101828] text-sm font-medium w-12",
				}}
				locale={id}
			/>
			<div className="flex flex-col items-start gap-3 border-t px-4 !pt-6">
				<div className="flex w-full items-center justify-between px-1">
					<div className="text-sm font-medium">
						{date?.toLocaleDateString("id-ID", {
							day: "numeric",
							month: "long",
							year: "numeric",
						})}
					</div>
				</div>
				<div className="w-full flex flex-col gap-3">
					{events.map((event) => (
						<div
							key={event.title}
							className="bg-[#F2F4F7] relative rounded-xl p-4 pl-6 text-sm after:bg-[#17C3AF] after:absolute after:inset-y-4 after:left-3 after:w-0.5 after:rounded-full"
						>
							<div className="font-bold">{event.title}</div>
							<div className="text-[#667085] text-sm">
								{new Date(event.from).toLocaleTimeString([], {
									hour: "2-digit",
									minute: "2-digit",
								})}{" "}
								-{" "}
								{new Date(event.to).toLocaleTimeString([], {
									hour: "2-digit",
									minute: "2-digit",
								})}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
