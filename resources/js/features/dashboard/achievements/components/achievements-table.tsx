import { DataTable } from "@/shared/components/data-table";
import { Button } from "@/shared/components/ui/button";
import { Link, router } from "@inertiajs/react";
import type { ColumnDef } from "@tanstack/react-table";
import { EyeIcon, PenLineIcon, Trash2Icon } from "lucide-react";
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
import { useAuth } from "../../../../shared/hooks/use-auth";
import {
	AchievementSetTypeMap,
	AchievementTypeMap,
} from "../../../../shared/lib/enums";
import type { Achievement } from "../../../../shared/types";

type Props = {
	achievements: Achievement[];
};

export default function AchievementsTable({ achievements }: Props) {
	const columns: ColumnDef<Achievement>[] = [
		{
			header: "No",
			cell: ({ row }) => row.index + 1,
		},
		{
			accessorKey: "name",
			header: "Nama prestasi",
		},
		{
			accessorKey: "type",
			header: "Jenis prestasi",
			cell: ({ row }) => AchievementTypeMap[row.original.type],
		},
		{
			accessorKey: "type",
			header: "Nama Himpunan",
			cell: ({ row }) => AchievementSetTypeMap[row.original.set_type],
		},
		{
			header: "Aksi",
			cell: ({ row }) => {
				const { user } = useAuth();
				return (
					<div className="flex flex-row items-center">
						<Link href={`/dashboard/achievements/${row.original.id}`}>
							<Button variant="ghost" size="icon">
								<EyeIcon className="size-4 text-[#2274C3]" />
							</Button>
						</Link>
						<Link href={`/dashboard/achievements/${row.original.id}/edit`}>
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

	return <DataTable columns={columns} data={achievements} />;
}
