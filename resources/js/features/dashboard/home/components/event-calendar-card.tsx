import { buttonVariants } from "@/shared/components/ui/button";
import { Calendar } from "@/shared/components/ui/calendar";
import { cn } from "@/shared/lib/utils";
import type { Agenda } from "@/shared/types";
import { router } from "@inertiajs/react";
import { id } from "date-fns/locale";
import { useEffect, useState } from "react";

type Props = {
	agendas: Agenda[];
};

export default function EventCalendarCard({ agendas }: Props) {
	const initializeDateFromUrl = () => {
		const params = new URLSearchParams(window.location.search);
		const urlDate = params.get("date");

		if (urlDate) {
			const parsedDate = new Date(urlDate);
			if (!Number.isNaN(parsedDate.getTime())) {
				return parsedDate;
			}
		}

		return new Date();
	};

	const [date, setDate] = useState<Date | undefined>(initializeDateFromUrl());

	useEffect(() => {
		if (!date) return;

		// add time to date to ensure it is in the correct tz
		const formattedDate = new Date(
			date.getFullYear(),
			date.getMonth(),
			date.getDate(),
			date.getHours() + 7,
		)
			.toISOString()
			.split("T")[0];

		// Update URL first
		const url = new URL(window.location.href);
		url.searchParams.set("date", formattedDate);

		// Then make Inertia request
		router.visit(url.toString(), {
			method: "get",
			preserveState: true,
			preserveScroll: true,
			replace: true,
		});
	}, [date]);

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
					{agendas.map((agenda) => (
						<div
							key={agenda.id}
							className="bg-[#F2F4F7] relative rounded-xl p-4 pl-6 text-sm after:bg-[#17C3AF] after:absolute after:inset-y-4 after:left-3 after:w-0.5 after:rounded-full"
						>
							<div className="font-bold">{agenda.name}</div>
							<div className="text-[#667085] text-sm">
								{new Date(agenda.date).toLocaleDateString([], {
									weekday: "long",
								})}
							</div>
						</div>
					))}
					{agendas.length === 0 && (
						<div className="text-[#667085] text-sm">
							Tidak ada agenda pada tanggal ini
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
