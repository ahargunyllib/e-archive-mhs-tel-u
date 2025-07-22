import AchievementChartCard from "@/features/dashboard/home/components/achievement-chart-card";
import EventCalendarCard from "@/features/dashboard/home/components/event-calendar-card";
import StatisticCard from "@/features/dashboard/home/components/statistic-card";
import UploadDocumentAgendaStatusTableCard from "@/features/dashboard/home/components/upload-document-agenda-status-table-card";
import DashboardLayout from "@/shared/components/layouts/dashboard-layout";
import { Button } from "@/shared/components/ui/button";
import { router } from "@inertiajs/react";
import {
	CalendarDaysIcon,
	CalendarIcon,
	FileTextIcon,
	StarIcon,
	Trash2Icon,
	UsersIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../../shared/components/ui/select";
import useDebounce from "../../shared/hooks/use-debounce";
import {
	type AchievementTypeMap,
	MemberPeriods,
	MemberSetTypes,
} from "../../shared/lib/enums";
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
	const searchParams = new URLSearchParams(window.location.search);
	const [filter, setFilter] = useState({
		period: searchParams.get("period")
			? Number(searchParams.get("period"))
			: undefined,
		himpunan: searchParams.get("himpunan")
			? Number(searchParams.get("himpunan"))
			: undefined,
	});
	const debouncedPeriod = useDebounce(filter.period, 500);

	useEffect(() => {
		router.get(
			window.location.pathname,
			{
				period: debouncedPeriod,
				himpunan: filter.himpunan,
			},
			{
				preserveState: true,
				preserveScroll: true,
			},
		);
	}, [debouncedPeriod, filter.himpunan]);

	return (
		<DashboardLayout>
			<div className="flex flex-row justify-between items-center">
				<h1 className="font-bold text-xl text-[#F9FAFB]">Dashboard</h1>
				<div className="flex flex-row gap-2">
					{/* Filter by Himpunan */}
					<Select
						onValueChange={(val) => {
							setFilter({ ...filter, himpunan: Number(val) });
						}}
						value={filter.himpunan?.toString()}
					>
						<SelectTrigger className="bg-[#F2F4F7] hover:bg-[#F2F4F7]/80 text-[#101828] rounded-full font-medium text-sm">
							<SelectValue
								placeholder="Pilih Himpunan"
								className="text-[#101828]"
							/>
						</SelectTrigger>
						<SelectContent>
							{MemberSetTypes.map((set_type) => {
								return (
									<SelectItem
										key={set_type.key}
										value={set_type.key.toString()}
									>
										{set_type.value}
									</SelectItem>
								);
							})}
						</SelectContent>
					</Select>

					<Select
						onValueChange={(val) => {
							setFilter({ ...filter, period: Number(val) });
						}}
						value={filter.period?.toString()}
					>
						<SelectTrigger className="bg-[#F2F4F7] hover:bg-[#F2F4F7]/80 text-[#101828] rounded-full font-medium text-sm">
							<SelectValue
								placeholder="Pilih Periode"
								className="text-[#101828]"
							/>
							<CalendarDaysIcon className="size-4" />
						</SelectTrigger>
						<SelectContent>
							{MemberPeriods.map((period) => {
								return (
									<SelectItem key={period.key} value={period.key.toString()}>
										{period.value}
									</SelectItem>
								);
							})}
						</SelectContent>
					</Select>
					{(filter.period || filter.himpunan) && (
						<Button
							className="bg-[#F2F4F7] hover:bg-[#F2F4F7]/80 text-[#101828] rounded-full font-medium text-sm h-12"
							onClick={() => {
								setFilter({ ...filter, period: undefined });
								router.get(window.location.pathname, {
									preserveState: true,
									preserveScroll: true,
								});
							}}
						>
							<Trash2Icon className="size-4 text-[#DC2625]" />
						</Button>
					)}
				</div>
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
