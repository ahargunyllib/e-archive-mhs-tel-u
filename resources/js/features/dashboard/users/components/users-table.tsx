import { DataTable } from "@/shared/components/data-table";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/shared/components/ui/avatar";
import { Button } from "@/shared/components/ui/button";
import type { ColumnDef } from "@tanstack/react-table";
import { PenLineIcon, Trash2Icon } from "lucide-react";

export default function UsersTable() {
	const columns: ColumnDef<{
		id: string;
		name: string;
		username: string;
		email: string;
		role: string;
		avatar: string | null;
	}>[] = [
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
		},
		{
			accessorKey: "avatar",
			header: "Avatar",
			cell: ({ row }) => (
				<Avatar className="rounded-lg size-12">
					<AvatarImage
						src={row.original.avatar || ""}
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

	// Sample data for the table
	const data: {
		id: string;
		name: string;
		username: string;
		email: string;
		role: string;
		avatar: string | null;
	}[] = [
		{
			id: "1",
			name: "John Doe",
			username: "johndoe",
			email: "johndoe@example.com",
			role: "Admin",
			avatar: "https://via.placeholder.com/150",
		},
		{
			id: "2",
			name: "Jane Smith",
			username: "janesmith",
			email: "janesmith@example.com",
			role: "User",
			avatar: "https://via.placeholder.com/150",
		},
		{
			id: "3",
			name: "Alice Johnson",
			username: "alicej",
			email: "alicej@example.com",
			role: "Moderator",
			avatar: null,
		},
		{
			id: "4",
			name: "Bob Brown",
			username: "bobbrown",
			email: "bobbrown@example.com",
			role: "User",
			avatar: "https://via.placeholder.com/150",
		},
		{
			id: "5",
			name: "Charlie Davis",
			username: "charlied",
			email: "charlied@example.com",
			role: "Admin",
			avatar: null,
		},
		{
			id: "6",
			name: "Emily White",
			username: "emilyw",
			email: "emilyw@example.com",
			role: "User",
			avatar: "https://via.placeholder.com/150",
		},
		{
			id: "7",
			name: "Frank Green",
			username: "frankg",
			email: "frankg@example.com",
			role: "Moderator",
			avatar: null,
		},
		{
			id: "8",
			name: "Grace Lee",
			username: "gracel",
			email: "gracel@example.com",
			role: "User",
			avatar: "https://via.placeholder.com/150",
		},
		{
			id: "9",
			name: "Henry Adams",
			username: "henrya",
			email: "henrya@example.com",
			role: "Admin",
			avatar: null,
		},
		{
			id: "10",
			name: "Ivy Clark",
			username: "ivyc",
			email: "ivyc@example.com",
			role: "User",
			avatar: "https://via.placeholder.com/150",
		},
	];

	return <DataTable columns={columns} data={data} />;
}
