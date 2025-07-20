import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import useDebounce from "@/shared/hooks/use-debounce";
import { router } from "@inertiajs/react";
import { SearchIcon, Settings2Icon } from "lucide-react";
import { useEffect, useState } from "react";

export default function FilterAgendas() {
	const searchParams = new URLSearchParams(window.location.search);
	const [filter, setFilter] = useState({
		search: searchParams.get("search") || "",
	});

	const debouncedFilter = useDebounce(filter, 500);

	useEffect(() => {
		router.get(
			window.location.pathname,
			{
				...debouncedFilter,
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
					placeholder="Cari agenda kegiatan"
					value={filter.search}
					onChange={(e) => setFilter({ ...filter, search: e.target.value })}
				/>
				<div className="text-[#101828] pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
					<SearchIcon className="size-4" />
				</div>
			</div>
			<Button
				// TODO
				className="bg-[#F2F4F7] hover:bg-[#F2F4F7]/80 text-[#101828] rounded-full font-medium text-sm"
			>
				<Settings2Icon className="size-4" />
				Filter
			</Button>
		</div>
	);
}
