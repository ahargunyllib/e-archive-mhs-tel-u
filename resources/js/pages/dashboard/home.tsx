import AchievementChartCard from "@/features/dashboard/home/components/achievement-chart-card";
import EventCalendarCard from "@/features/dashboard/home/components/event-calendar-card";
import StatisticCard from "@/features/dashboard/home/components/statistic-card";
import UploadDocumentAgendaStatusTableCard from "@/features/dashboard/home/components/upload-document-agenda-status-table-card";
import DashboardLayout from "@/shared/components/layouts/dashboard-layout";
import { Button } from "@/shared/components/ui/button";
import {
	CalendarDaysIcon,
	CalendarIcon,
	FileTextIcon,
	StarIcon,
	UsersIcon,
} from "lucide-react";

export default function Home() {
	return (
		<DashboardLayout>
			<div className="flex flex-row justify-between items-center">
				<h1 className="font-bold text-xl text-[#F9FAFB]">Dashboard</h1>
				<Button className="bg-[#F2F4F7] hover:bg-[#F2F4F7]/80 text-[#101828] rounded-full font-medium text-sm">
					Pilih Periode
					<CalendarDaysIcon className="size-4" />
				</Button>
			</div>

			<div className="flex flex-col gap-4">
				<div className="grid grid-cols-4 gap-4">
					<StatisticCard
						icon={UsersIcon}
						title="Total anggota himpunan"
						value={1300}
						label="Anggota"
					/>
					<StatisticCard
						icon={CalendarIcon}
						title="Total agenda himpunan"
						value={300}
						label="Agenda"
					/>
					<StatisticCard
						icon={StarIcon}
						title="Prestasi yang diraih"
						value={422}
						label="Prestasi"
					/>
					<StatisticCard
						icon={FileTextIcon}
						title="Proposal & laporan dikirimkan"
						value={123}
						label="Proposal"
					/>
				</div>

				<div className="flex flex-row gap-4">
					<EventCalendarCard />

					<div className="flex flex-col gap-4 w-full">
						<AchievementChartCard />
						<UploadDocumentAgendaStatusTableCard />
					</div>
				</div>
			</div>
		</DashboardLayout>
	);
}
