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
import type { Member } from "@/shared/types";
import { Link, router } from "@inertiajs/react";
import type { ColumnDef } from "@tanstack/react-table";
import { EyeIcon, PenLineIcon, Trash2Icon } from "lucide-react";
import { MemberSetTypeMap } from "../../../../shared/lib/enums";

type Props = {
	members: Member[];
};

export default function MembersTable({ members }: Props) {
	const columns: ColumnDef<Member>[] = [
		{
			header: "No",
			cell: ({ row }) => row.index + 1,
		},
		{
			accessorKey: "name",
			header: "Nama mahasiswa",
		},
		{
			accessorKey: "type",
			header: "Nama Himpunan",
			cell: ({ row }) => MemberSetTypeMap[row.original.set_type],
		},
		{
			accessorKey: "division",
			header: "Divisi",
		},
		{
			accessorKey: "email",
			header: "Email",
			cell: ({ row }) =>
				row.original.email ? (
					<a
						href={`mailto:${row.original.email}`}
						className="text-blue-600 hover:underline"
					>
						{row.original.email}
					</a>
				) : (
					"Tidak ada email"
				),
		},
		{
			accessorKey: "instagram",
			header: "Instagram",
			cell: ({ row }) =>
				row.original.instagram ? (
					<a
						href={`https://instagram.com/${row.original.instagram}`}
						target="_blank"
						rel="noopener noreferrer"
						className="text-blue-600 hover:underline"
					>
						{row.original.instagram}
					</a>
				) : (
					"Tidak ada Instagram"
				),
		},
		{
			accessorKey: "linkedin",
			header: "LinkedIn",
			cell: ({ row }) =>
				row.original.linkedin ? (
					<a
						href={`https://linkedin.com/in/${row.original.linkedin}`}
						target="_blank"
						rel="noopener noreferrer"
						className="text-blue-600 hover:underline"
					>
						{row.original.linkedin}
					</a>
				) : (
					"Tidak ada LinkedIn"
				),
		},
		{
			header: "Aksi",
			cell: ({ row }) => {
				const { user } = useAuth();
				return (
					<div className="flex flex-row items-center">
						<Link href={`/dashboard/members/${row.original.id}`}>
							<Button variant="ghost" size="icon">
								<EyeIcon className="size-4 text-[#2274C3]" />
							</Button>
						</Link>
						<Link href={`/dashboard/members/${row.original.id}/edit`}>
							<Button variant="ghost" size="icon">
								<PenLineIcon className="size-4 text-[#FFBD00]" />
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
											the member and remove the data from our servers.
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
														`/dashboard/members/${row.original.id}`,
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

	return <DataTable columns={columns} data={members} />;
}
