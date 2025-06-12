import { DataTable } from "@/shared/components/data-table";
import { Button } from "@/shared/components/ui/button";
import type { ColumnDef } from "@tanstack/react-table";
import { EyeIcon, PenLineIcon, Trash2Icon } from "lucide-react";

export default function AchievementsTable() {
	const columns: ColumnDef<{
		id: string;
		name: string;
		division: string;
		type: string;
	}>[] = [
		{
			header: "No",
			cell: ({ row }) => row.index + 1,
		},
		{
			accessorKey: "name",
			header: "Nama mahasiswa",
		},
		{
			accessorKey: "division",
			header: "Divisi",
		},
		{
			accessorKey: "type",
			header: "Tipe Himpunan",
		},
		{
			header: "Aksi",
			cell: () => (
				<div className="flex flex-row items-center">
					<Button variant="ghost" size="icon">
						<EyeIcon className="size-4 text-[#2274C3]" />
					</Button>
					<Button variant="ghost" size="icon">
						<PenLineIcon className="size-4 text-[#FFBD00]" />
					</Button>
					<Button variant="ghost" size="icon">
						<Trash2Icon className="size-4 text-[#DC2625]" />
					</Button>
				</div>
			),
		},
	];

	// Sample data for the table
	const data: {
		id: string;
		name: string;
		division: string;
		type: string;
	}[] = [
		{
			id: "1",
			name: "John Doe",
			division: "Kaderisasi",
			type: "Himpunan Jurusan",
		},
		{
			id: "2",
			name: "Jane Smith",
			division: "Pengembangan Informasi",
			type: "Himpunan Fakultas",
		},
		{
			id: "3",
			name: "Alice Johnson",
			division: "Akademik",
			type: "Himpunan Jurusan",
		},
		{
			id: "4",
			name: "Bob Brown",
			division: "Dana dan Usaha",
			type: "Himpunan Fakultas",
		},
		{
			id: "5",
			name: "Charlie Davis",
			division: "Sosial dan Masyarakat",
			type: "Himpunan Jurusan",
		},
		{
			id: "6",
			name: "Emily White",
			division: "Riset dan Teknologi",
			type: "Himpunan Fakultas",
		},
		{
			id: "7",
			name: "Frank Green",
			division: "Hubungan Eksternal",
			type: "Himpunan Jurusan",
		},
		{
			id: "8",
			name: "Grace Lee",
			division: "Kewirausahaan",
			type: "Himpunan Fakultas",
		},
		{
			id: "9",
			name: "Henry Adams",
			division: "Keorganisasian",
			type: "Himpunan Jurusan",
		},
		{
			id: "10",
			name: "Ivy Clark",
			division: "Minat dan Bakat",
			type: "Himpunan Fakultas",
		},
	];

	return <DataTable columns={columns} data={data} />;
}
