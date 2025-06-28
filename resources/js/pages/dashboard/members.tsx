import FilterMembers from "@/features/dashboard/members/components/filter-members";
import MembersTable from "@/features/dashboard/members/components/members-table";
import DashboardLayout from "@/shared/components/layouts/dashboard-layout";
import Pagination from "@/shared/components/pagination";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/shared/components/ui/breadcrumb";
import { Button } from "@/shared/components/ui/button";
import { Link, router } from "@inertiajs/react";
import { DownloadCloudIcon, PlusIcon, UploadIcon } from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../../shared/components/ui/dialog";
import { Label } from "../../shared/components/ui/label";
import {
	Table,
	TableBody,
	TableCell,
	TableHeader,
	TableRow,
} from "../../shared/components/ui/table";
import type { Member } from "../../shared/types";

type Props = {
	members: Member[]; // Adjust type as needed
	pagination: {
		page: number;
		limit: number;
		total: number;
		totalPages: number;
	};
};

export default function Members({ members, pagination }: Props) {
	const onImportCSV = () => {
		const input = document.createElement("input");
		input.type = "file";
		input.accept = ".csv";
		input.onchange = (event) => {
			const file = (event.target as HTMLInputElement).files?.[0];
			if (file) {
				const formData = new FormData();
				formData.append("file", file);

				router.post("/dashboard/members/import", formData);
			}
		};
		input.click();
	};
	return (
		<DashboardLayout>
			<div className="flex flex-row justify-between items-center">
				<div className="flex flex-col justify-between">
					<h1 className="font-bold text-xl text-[#F9FAFB]">
						Data Anggota Himpunan
					</h1>
					<Breadcrumb>
						<BreadcrumbList>
							<BreadcrumbItem>
								<BreadcrumbLink href="/dashboard/home">
									Dashboard
								</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator />
							<BreadcrumbItem>
								<BreadcrumbPage>Data anggota himpunan</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</div>
				<div className="flex flex-row items-center gap-4">
					<Dialog>
						<DialogTrigger asChild>
							<Button className="bg-[#F2F4F7] hover:bg-[#F2F4F7]/80 text-[#101828] rounded-full font-medium text-sm">
								<UploadIcon className="size-4" />
								Import data csv
							</Button>
						</DialogTrigger>
						<DialogContent className="max-h-1/2 overflow-y-auto">
							<DialogHeader>
								<DialogTitle>Import Data Anggota</DialogTitle>
								<DialogDescription>
									Pastikan file CSV Anda memiliki kolom yang benar dan tidak ada
									data yang hilang. Format file CSV berupa
									`nama,alamat,kontak,divisi,angka nama himpunan,angka
									angkatan,angka periode`.
								</DialogDescription>
							</DialogHeader>
							<div className="space-y-4">
								<div className="space-y-2">
									<Label>Tabel Nama Himpunan</Label>
									<Table>
										<TableHeader>
											<TableRow>
												<TableCell className="font-medium">
													Nama Himpunan
												</TableCell>
												<TableCell className="font-medium">
													Angka Nama Himpunan
												</TableCell>
											</TableRow>
										</TableHeader>
										<TableBody>
											<TableRow>
												<TableCell>HMTI</TableCell>
												<TableCell>1</TableCell>
											</TableRow>
											<TableRow>
												<TableCell>HMSI</TableCell>
												<TableCell>2</TableCell>
											</TableRow>
											<TableRow>
												<TableCell>DISCA</TableCell>
												<TableCell>3</TableCell>
											</TableRow>
											<TableRow>
												<TableCell>MTO</TableCell>
												<TableCell>4</TableCell>
											</TableRow>
											<TableRow>
												<TableCell>FPS</TableCell>
												<TableCell>5</TableCell>
											</TableRow>
											<TableRow>
												<TableCell>SIECA</TableCell>
												<TableCell>6</TableCell>
											</TableRow>
										</TableBody>
									</Table>
								</div>
								<div className="space-y-2">
									<Label>Tabel Angkatan</Label>
									<Table>
										<TableHeader>
											<TableRow>
												<TableCell className="font-medium">Angkatan</TableCell>
												<TableCell className="font-medium">
													Angka Angkatan
												</TableCell>
											</TableRow>
										</TableHeader>
										<TableBody>
											<TableRow>
												<TableCell>2020</TableCell>
												<TableCell>1</TableCell>
											</TableRow>
											<TableRow>
												<TableCell>2021</TableCell>
												<TableCell>2</TableCell>
											</TableRow>
											<TableRow>
												<TableCell>2022</TableCell>
												<TableCell>3</TableCell>
											</TableRow>
											<TableRow>
												<TableCell>2023</TableCell>
												<TableCell>4</TableCell>
											</TableRow>
											<TableRow>
												<TableCell>2024</TableCell>
												<TableCell>5</TableCell>
											</TableRow>
											<TableRow>
												<TableCell>2025</TableCell>
												<TableCell>6</TableCell>
											</TableRow>
											<TableRow>
												<TableCell>2026</TableCell>
												<TableCell>7</TableCell>
											</TableRow>
										</TableBody>
									</Table>
								</div>
								<div className="space-y-2">
									<Label>Tabel Periode</Label>
									<Table>
										<TableHeader>
											<TableRow>
												<TableCell className="font-medium">Periode</TableCell>
												<TableCell className="font-medium">
													Angka Periode
												</TableCell>
											</TableRow>
										</TableHeader>
										<TableBody>
											<TableRow>
												<TableCell>2020-2021</TableCell>
												<TableCell>1</TableCell>
											</TableRow>
											<TableRow>
												<TableCell>2021-2022</TableCell>
												<TableCell>2</TableCell>
											</TableRow>
											<TableRow>
												<TableCell>2022-2023</TableCell>
												<TableCell>3</TableCell>
											</TableRow>
											<TableRow>
												<TableCell>2023-2024</TableCell>
												<TableCell>4</TableCell>
											</TableRow>
											<TableRow>
												<TableCell>2024-2025</TableCell>
												<TableCell>5</TableCell>
											</TableRow>
										</TableBody>
									</Table>
								</div>
							</div>
							<DialogFooter>
								<Button
									type="button"
									variant="secondary"
									className="font-medium text-sm py-3 px-8 rounded-md h-fit"
									onClick={onImportCSV}
								>
									<UploadIcon className="size-4" />
									Pilih File CSV
								</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>
					<Button className="bg-[#F2F4F7] hover:bg-[#F2F4F7]/80 text-[#101828] rounded-full font-medium text-sm">
						<DownloadCloudIcon className="size-4" />
						Export data ke csv
					</Button>
					<Link href="/dashboard/members/create">
						<Button className="bg-[#00332D] hover:bg-[#00332D]/80 text-[#F9FAFB] rounded-full font-medium text-sm p-1 pr-4">
							<div className="bg-[#17C3AF] p-1 rounded-full aspect-square">
								<PlusIcon className="size-4" />
							</div>
							Tambah Data
						</Button>
					</Link>
				</div>
			</div>

			<div className="flex flex-col gap-6 bg-white rounded-2xl px-6 py-5 border border-[#EAECF0]">
				<FilterMembers />

				<MembersTable members={members} />

				<Pagination
					currentPage={pagination.page}
					totalPages={pagination.totalPages}
					limit={pagination.limit}
				/>
			</div>
		</DashboardLayout>
	);
}
