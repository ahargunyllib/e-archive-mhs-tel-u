import { DataTable } from "@/shared/components/data-table";
import { Badge } from "@/shared/components/ui/badge";
import { cn } from "@/shared/lib/utils";
import type { ColumnDef } from "@tanstack/react-table";
import { AgendaStatusMap } from "../../../../shared/lib/enums";
import type { Agenda } from "../../../../shared/types";

type Props = {
	agendaProgresses: Agenda[];
};

export default function UploadDocumentAgendaStatusTableCard({
	agendaProgresses,
}: Props) {
	const columns: ColumnDef<Agenda>[] = [
		{
			accessorKey: "work_program",
			header: "Program Kerja",
		},
		{
			accessorKey: "name",
			header: "Nama Kegiatan",
		},
		{
			accessorKey: "progress",
			header: "Progres Dokumen",
			cell: ({ row }) => {
				let val = 0;

				if (row.original.proposal && row.original.status !== 2) {
					val = 20;
				}

				if (row.original.proposal && row.original.status === 2) {
					val = 60;
				}

				if (row.original.report && row.original.status !== 2) {
					val = 80;
				}

				if (row.original.report && row.original.status === 2) {
					val = 100;
				}

				return (
					<div className="w-full flex flex-row items-center gap-2">
						<div className="w-full bg-[#EBFAF0] rounded-full h-1.5">
							<div
								className="bg-[#35CA61] h-1.5 rounded-full"
								style={{ width: `${val}%` }}
							/>
						</div>
						<div className="text-sm text-[#667085] mb-1">{val}%</div>
					</div>
				);
			},
		},
		{
			accessorKey: "status",
			header: "Status",
			cell: ({ row }) => {
				const val = row.original.status;

				const badgeBackgroundColorVariants = {
					1: "bg-[#F9FAFB]",
					2: "bg-[#ECFDF3]",
					3: "bg-[#FFE5E5]",
				};

				const badgeTextColorVariants = {
					1: "text-[#98A2B3]",
					2: "text-[#037847]",
					3: "text-[#DC2625]",
				};

				const badgeDotColorVariants = {
					1: "bg-[#98A2B3]",
					2: "bg-[#037847]",
					3: "bg-[#DC2625]",
				};

				return (
					<Badge
						className={cn(
							"w-fit rounded-2xl px-2 py-1 gap-2",
							badgeBackgroundColorVariants[val],
							badgeTextColorVariants[val],
						)}
					>
						<div
							className={cn(
								"size-2 rounded-full aspect-square bg-red-200",
								badgeDotColorVariants[val],
							)}
						/>
						{AgendaStatusMap[val]}
					</Badge>
				);
			},
		},
	];

	return (
		<div className="bg-white rounded-2xl p-6 border border-[#EAECF0] flex flex-col gap-6">
			<span className="font-medium text-[#080C18]">
				Status Upload Dokumen Kegiatan
			</span>

			<DataTable columns={columns} data={agendaProgresses} />
		</div>
	);
}
