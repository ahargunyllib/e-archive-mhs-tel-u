import { Button } from "@/shared/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/shared/components/ui/dialog";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/shared/components/ui/select";
import useDebounce from "@/shared/hooks/use-debounce";
import { UserRoles } from "@/shared/lib/enums";
import { router } from "@inertiajs/react";
import { SearchIcon, Settings2Icon, Trash2Icon } from "lucide-react";
import { useEffect, useState } from "react";

export default function FilterUsers() {
	const searchParams = new URLSearchParams(window.location.search);
	const [filter, setFilter] = useState({
		search: searchParams.get("search") || "",
		role: searchParams.get("role")
			? Number(searchParams.get("role"))
			: undefined,
	});

	const debouncedFilter = useDebounce(filter.search, 500);

	// biome-ignore lint/correctness/useExhaustiveDependencies: filter.role is not a dependency
	useEffect(() => {
		router.get(
			window.location.pathname,
			{
				search: debouncedFilter,
				role: filter.role,
				page: 1,
			},
			{
				preserveState: true,
				preserveScroll: true,
			},
		);
	}, [debouncedFilter]);

	return (
		<div className="flex flex-row items-center gap-2">
			<div className="relative">
				<Input
					className="peer bg-[#F2F4F7] rounded-3xl border-0 text-[#101828] h-auto p-2 ps-9"
					placeholder="Cari user"
					value={filter.search}
					onChange={(e) => setFilter({ ...filter, search: e.target.value })}
				/>
				<div className="text-[#101828] pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
					<SearchIcon className="size-4" />
				</div>
			</div>
			<Dialog>
				<DialogTrigger asChild>
					<Button className="bg-[#F2F4F7] hover:bg-[#F2F4F7]/80 text-[#101828] rounded-full font-medium text-sm">
						<Settings2Icon className="size-4" />
						Filter
					</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Filter</DialogTitle>
					</DialogHeader>
					<div className="space-y-6">
						<div className="grid gap-2">
							<Label
								className="text-base font-medium text-[#1D2939]"
								htmlFor="role"
							>
								Role
							</Label>
							<Select
								onValueChange={(val) => {
									setFilter({ ...filter, role: Number(val) });
								}}
								value={filter.role?.toString()}
							>
								<SelectTrigger className="w-full">
									<SelectValue placeholder="Pilih role" />
								</SelectTrigger>

								<SelectContent>
									{UserRoles.map((role) => {
										return (
											<SelectItem key={role.key} value={role.key.toString()}>
												{role.value}
											</SelectItem>
										);
									})}
								</SelectContent>
							</Select>
						</div>

						<DialogClose asChild>
							<Button
								onClick={() => {
									router.get(
										window.location.pathname,
										{
											search: filter.search,
											role: filter.role,
											page: 1,
										},
										{
											preserveState: true,
											preserveScroll: true,
										},
									);
								}}
								className="w-full bg-[#17C3AF] hover:bg-[#17C3AF]/80 text-white font-medium text-sm py-3 px-8 rounded-md h-fit"
							>
								Terapkan filter
							</Button>
						</DialogClose>
					</div>
				</DialogContent>
			</Dialog>
			{(filter.search || filter.role) && (
				<Button
					className="bg-[#F2F4F7] hover:bg-[#F2F4F7]/80 text-[#101828] rounded-full font-medium text-sm"
					onClick={() => {
						setFilter({ search: "", role: undefined });
						router.get(
							window.location.pathname,
							{
								page: 1,
							},
							{
								preserveState: true,
								preserveScroll: true,
							},
						);
					}}
				>
					<Trash2Icon className="size-4 text-[#DC2625]" />
				</Button>
			)}
		</div>
	);
}
