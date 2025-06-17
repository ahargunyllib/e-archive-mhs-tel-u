import FilterUsers from "@/features/dashboard/users/components/filter-users";
import UsersTable from "@/features/dashboard/users/components/users-table";
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
import type { User } from "@/shared/types";
import { Link } from "@inertiajs/react";
import { PlusIcon, UploadIcon } from "lucide-react";

type Props = {
	users: User[]; // Adjust type as needed
	pagination: {
		page: number;
		limit: number;
		total: number;
		totalPages: number;
	};
};

export default function Users({ users, pagination }: Props) {
	return (
		<DashboardLayout>
			<div className="flex flex-row justify-between items-center">
				<div className="flex flex-col justify-between">
					<h1 className="font-bold text-xl text-[#F9FAFB]">User</h1>
					<Breadcrumb>
						<BreadcrumbList>
							<BreadcrumbItem>
								<BreadcrumbLink href="/dashboard/home">
									Dashboard
								</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator />
							<BreadcrumbItem>
								<BreadcrumbPage>User</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</div>
				<div className="flex flex-row items-center gap-4">
					<Button className="bg-[#F2F4F7] hover:bg-[#F2F4F7]/80 text-[#101828] rounded-full font-medium text-xs">
						<UploadIcon className="size-4" />
						Export data ke csv
					</Button>
					<Link href="/dashboard/users/create">
						<Button className="bg-[#00332D] hover:bg-[#00332D]/80 text-[#F9FAFB] rounded-full font-medium text-xs p-1 pr-2">
							<div className="bg-[#17C3AF] p-1 rounded-full aspect-square">
								<PlusIcon className="size-4" />
							</div>
							Tambah Data
						</Button>
					</Link>
				</div>
			</div>

			<div className="flex flex-col gap-6 bg-white rounded-2xl px-6 py-5 border border-[#EAECF0]">
				<FilterUsers />

				<UsersTable users={users} />

				<Pagination
					currentPage={pagination.page}
					totalPages={pagination.totalPages}
					limit={pagination.limit}
				/>
			</div>
		</DashboardLayout>
	);
}
