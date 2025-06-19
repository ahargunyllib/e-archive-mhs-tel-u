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
import type { AchievementTypeMap } from "../../shared/lib/enums";
import type { Agenda } from "../../shared/types";

type Props = {
	totalMembers: number;
	totalAgendas: number;
	totalAchievements: number;
	totalProposals: number;
	agendas: Agenda[];
	achievementStatistics: {
		year: string;
		count: number;
		type: keyof typeof AchievementTypeMap;
	}[];
	agendaProgresses: Agenda[];
};

export default function Home({
	totalMembers,
	totalAgendas,
	totalAchievements,
	totalProposals,
	agendas,
	achievementStatistics,
	agendaProgresses,
}: Props) {
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
						value={totalMembers}
						label="Anggota"
					/>
					<StatisticCard
						icon={CalendarIcon}
						title="Total agenda himpunan"
						value={totalAgendas}
						label="Agenda"
					/>
					<StatisticCard
						icon={StarIcon}
						title="Prestasi yang diraih"
						value={totalAchievements}
						label="Prestasi"
					/>
					<StatisticCard
						icon={FileTextIcon}
						title="Proposal & laporan dikirimkan"
						value={totalProposals}
						label="Proposal"
					/>
				</div>

				<div className="flex flex-row gap-4">
					<EventCalendarCard agendas={agendas} />

					<div className="flex flex-col gap-4 w-full">
						<AchievementChartCard
							achievementStatistics={achievementStatistics}
						/>
						<UploadDocumentAgendaStatusTableCard
							agendaProgresses={agendaProgresses}
						/>
					</div>
				</div>
			</div>
		</DashboardLayout>
	);
}
