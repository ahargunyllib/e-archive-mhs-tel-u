import { DataTable } from "@/shared/components/data-table";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/shared/components/ui/avatar";
import { Button } from "@/shared/components/ui/button";
import type { User } from "@/shared/types";
import { Link, router } from "@inertiajs/react";
import type { ColumnDef } from "@tanstack/react-table";
import { PenLineIcon, Trash2Icon } from "lucide-react";
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
} from "../../../../shared/components/ui/alert-dialog";
import { UserRoleMap } from "../../../../shared/lib/enums";

type Props = {
	users: User[];
};

export default function UsersTable({ users }: Props) {
	const columns: ColumnDef<User>[] = [
		{
			header: "No",
			cell: ({ row }) => row.index + 1,
		},
		{
			accessorKey: "name",
			header: "Nama",
		},
		{
			accessorKey: "username",
			header: "Username",
		},
		{
			accessorKey: "email",
			header: "Email",
		},
		{
			accessorKey: "role",
			header: "Role",
			cell: ({ row }) => {
				const role = row.original.role;
				return UserRoleMap[role] || "Unknown";
			},
		},
		{
			accessorKey: "photo_profile",
			header: "Avatar",
			cell: ({ row }) => (
				<Avatar className="rounded-lg size-12">
					<AvatarImage
						src={row.original.photo_profile || ""}
						alt={row.original.name}
					/>
					<AvatarFallback className="rounded-lg">
						{row.original.name
							.split(" ")
							.map((word) => word.charAt(0).toUpperCase())
							.join("") || "NA"}
					</AvatarFallback>
				</Avatar>
			),
		},
		{
			header: "Aksi",
			cell: ({ row }) => (
				<div className="flex flex-row items-center">
					<Link href={`/dashboard/users/${row.original.id}/edit`}>
						<Button variant="ghost" size="icon">
							<PenLineIcon className="size-4 text-[#FFBD00]" />
						</Button>
					</Link>
					<AlertDialog>
						<AlertDialogTrigger asChild>
							<Button variant="ghost" size="icon">
								<Trash2Icon className="size-4 text-[#DC2625]" />
							</Button>
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
								<AlertDialogDescription>
									This action cannot be undone. This will permanently delete the
									user and remove the data from our servers.
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>Cancel</AlertDialogCancel>
								<AlertDialogAction asChild>
									<Button
										variant="destructive"
										className="bg-[#DC2625] hover:bg-[#B91C1C]"
										onClick={() => {
											router.delete(`/dashboard/users/${row.original.id}`);
										}}
									>
										Delete
									</Button>
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				</div>
			),
		},
	];

	return <DataTable columns={columns} data={users} />;
}
