import { DataTable } from "@/shared/components/data-table";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/shared/components/ui/avatar";
import { Button } from "@/shared/components/ui/button";
import type { User } from "@/shared/types";
import type { ColumnDef } from "@tanstack/react-table";
import { PenLineIcon, Trash2Icon } from "lucide-react";
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
			cell: () => (
				<div className="flex flex-row items-center">
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

	return <DataTable columns={columns} data={users} />;
}
