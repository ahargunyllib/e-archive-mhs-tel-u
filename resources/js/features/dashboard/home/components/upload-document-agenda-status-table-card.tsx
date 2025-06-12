import { DataTable } from "@/shared/components/data-table";
import { Badge } from "@/shared/components/ui/badge";
import { capitalize, cn } from "@/shared/lib/utils";
import type { ColumnDef } from "@tanstack/react-table";

export default function UploadDocumentAgendaStatusTableCard() {
	const columns: ColumnDef<{
		id: string;
		type: string;
		name: string;
		progress: number;
		status: "pending" | "processing" | "success" | "failed";
	}>[] = [
		{
			accessorKey: "type",
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
				const val = row.original.progress;
				return (
					<div className="w-full flex flex-row items-center gap-2">
						<div className="w-full bg-[#EBFAF0] rounded-full h-1.5">
							<div
								className="bg-[#35CA61] h-1.5 rounded-full"
								style={{ width: `${val}%` }}
							/>
						</div>
						<div className="text-xs text-[#667085] mb-1">{val}%</div>
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
					pending: "bg-[#F9FAFB]",
					processing: "bg-[#FFF8E5]",
					success: "bg-[#ECFDF3]",
					failed: "bg-[#FFE5E5]",
				};

				const badgeTextColorVariants = {
					pending: "text-[#98A2B3]",
					processing: "text-[#FFBD00]",
					success: "text-[#037847]",
					failed: "text-[#DC2625]",
				};

				const badgeDotColorVariants = {
					pending: "bg-[#98A2B3]",
					processing: "bg-[#FFBD00]",
					success: "bg-[#037847]",
					failed: "bg-[#DC2625]",
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
						{capitalize(val)}
					</Badge>
				);
			},
		},
	];

	// Sample data for the table
	const data: {
		id: string;
		type: string;
		name: string;
		progress: number;
		status: "pending" | "processing" | "success" | "failed";
	}[] = [
		{
			id: "1",
			type: "Proposal",
			name: "Kegiatan A",
			progress: 50,
			status: "pending",
		},
		{
			id: "2",
			type: "Laporan",
			name: "Kegiatan B",
			progress: 75,
			status: "processing",
		},
		{
			id: "3",
			type: "Proposal",
			name: "Kegiatan C",
			progress: 100,
			status: "success",
		},
		{
			id: "4",
			type: "Laporan",
			name: "Kegiatan D",
			progress: 30,
			status: "failed",
		},
	];

	return (
		<div className="bg-white rounded-2xl p-6 border border-[#EAECF0] flex flex-col gap-6">
			<span className="font-medium text-[#080C18]">
				Status Upload Dokumen Kegiatan
			</span>

			<DataTable columns={columns} data={data} />
		</div>
	);
}
