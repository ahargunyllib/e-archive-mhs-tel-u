import { DataTable } from "@/shared/components/data-table";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/shared/components/ui/alert-dialog";
import { Button } from "@/shared/components/ui/button";
import { useAuth } from "@/shared/hooks/use-auth";
import { AgendaSetTypeMap } from "@/shared/lib/enums";
import type { Agenda } from "@/shared/types";
import { Link, router } from "@inertiajs/react";
import type { ColumnDef } from "@tanstack/react-table";
import { EyeIcon, PenLineIcon, Trash2Icon } from "lucide-react";

type Props = {
	agendas: Agenda[];
};

export default function AgendasTable({ agendas }: Props) {
	const columns: ColumnDef<Agenda>[] = [
		{
			header: "No",
			cell: ({ row }) => row.index + 1,
		},
		{
			accessorKey: "date",
			header: "Tanggal",
			cell: ({ row }) => {
				return new Date(row.original.date).toLocaleDateString("id-ID", {
					day: "2-digit",
					month: "2-digit",
					year: "numeric",
				});
			},
		},
		{
			accessorKey: "work_program",
			header: "Program Kerja",
		},
		{
			accessorKey: "name",
			header: "Nama kegiatan",
		},
		{
			accessorKey: "set_type",
			header: "Tipe Himpunan",
			cell: ({ row }) => AgendaSetTypeMap[row.original.set_type],
		},
		{
			header: "Aksi",
			cell: ({ row }) => {
				const { user } = useAuth();
				return (
					<div className="flex flex-row items-center">
						<Link href={`/dashboard/agendas/${row.original.id}`}>
							<Button variant="ghost" size="icon">
								<EyeIcon className="size-4 text-[#2274C3]" />
							</Button>
						</Link>
						<Link href={`/dashboard/agendas/${row.original.id}/edit`}>
							<Button variant="ghost" size="icon">
								<PenLineIcon className="size-4 text-[#FBBF24]" />
							</Button>
						</Link>
						{user.role === 1 && (
							<AlertDialog>
								<AlertDialogTrigger asChild>
									<Button variant="ghost" size="icon">
										<Trash2Icon className="size-4 text-[#DC2625]" />
									</Button>
								</AlertDialogTrigger>
								<AlertDialogContent>
									<AlertDialogHeader>
										<AlertDialogTitle>
											Are you absolutely sure?
										</AlertDialogTitle>
										<AlertDialogDescription>
											This action cannot be undone. This will permanently delete
											the agenda and remove the data from our servers.
										</AlertDialogDescription>
									</AlertDialogHeader>
									<AlertDialogFooter>
										<AlertDialogCancel>Cancel</AlertDialogCancel>
										<AlertDialogAction asChild>
											<Button
												variant="destructive"
												className="bg-[#DC2625] hover:bg-[#B91C1C]"
												onClick={() => {
													router.delete(
														`/dashboard/agendas/${row.original.id}`,
													);
												}}
											>
												Delete
											</Button>
										</AlertDialogAction>
									</AlertDialogFooter>
								</AlertDialogContent>
							</AlertDialog>
						)}
					</div>
				);
			},
		},
	];

	return <DataTable columns={columns} data={agendas} />;
}
