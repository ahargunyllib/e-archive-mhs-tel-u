import { DataTable } from "@/shared/components/data-table";
import { Button } from "@/shared/components/ui/button";
import type { ColumnDef } from "@tanstack/react-table";
import { EyeIcon, PenLineIcon, Trash2Icon } from "lucide-react";

export default function AgendasTable() {
	const columns: ColumnDef<{
		id: string;
		date: string;
		workProgram: string;
		name: string;
		type: string;
	}>[] = [
		{
			header: "No",
			cell: ({ row }) => row.index + 1,
		},
		{
			accessorKey: "date",
			header: "Tanggal",
		},
		{
			accessorKey: "workProgram",
			header: "Program Kerja",
		},
		{
			accessorKey: "name",
			header: "Nama kegiatan",
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
		date: string;
		workProgram: string;
		name: string;
		type: string;
	}[] = [
		{
			id: "1",
			date: "2025-01-10",
			workProgram: "Penerimaan Anggota",
			name: "Open Recruitment Anggota Baru",
			type: "Himpunan Jurusan",
		},
		{
			id: "2",
			date: "2025-02-15",
			workProgram: "Akademik",
			name: "	Latihan Kepemimpinan Dasar (LKD)",
			type: "Himpunan Fakultas",
		},
		{
			id: "3",
			date: "2025-03-20",
			workProgram: "Akademik",
			name: "Seminar Nasional Keprofesian",
			type: "Himpunan Jurusan",
		},
		{
			id: "4",
			date: "2025-04-25",
			workProgram: "Sosial Masyarakat",
			name: "Bakti Sosial ke Desa Binaan",
			type: "Himpunan Fakultas",
		},
		{
			id: "5",
			date: "2025-05-30",
			workProgram: "Media dan Informasi",
			name: "Pelatihan Desain Grafis",
			type: "Himpunan Jurusan",
		},
		{
			id: "6",
			date: "2025-06-05",
			workProgram: "Kewirausahaan",
			name: "Bazaar Produk Mahasiswa",
			type: "Himpunan Fakultas",
		},
		{
			id: "7",
			date: "2025-07-10",
			workProgram: "Riset dan Teknologi",
			name: "Workshop IoT untuk Pemula",
			type: "Himpunan Jurusan",
		},
		{
			id: "8",
			date: "2025-08-15",
			workProgram: "Hubungan Eksternal",
			name: "Company Visit ke Startup Lokal",
			type: "Himpunan Fakultas",
		},
		{
			id: "9",
			date: "2025-09-20",
			workProgram: "Minat dan Bakat",
			name: "Turnamen Futsal Internal",
			type: "Himpunan Jurusan",
		},
		{
			id: "10",
			date: "2025-10-25",
			workProgram: "Keorganisasian",
			name: "Rapat Kerja Tengah Tahun",
			type: "Himpunan Fakultas",
		},
	];

	return <DataTable columns={columns} data={data} />;
}
