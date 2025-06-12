import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { SearchIcon, Settings2Icon } from "lucide-react";

export default function FilterUsers() {
	return (
		<div className="flex flex-row items-center gap-2">
			<div className="relative">
				<Input
					className="peer bg-[#F2F4F7] rounded-3xl border-0 text-[#101828] h-auto p-2 ps-9"
					placeholder="Cari user"
				/>
				<div className="text-[#101828] pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
					<SearchIcon className="size-4" />
				</div>
			</div>
			<Button
				// TODO
				className="bg-[#F2F4F7] hover:bg-[#F2F4F7]/80 text-[#101828] rounded-full font-medium text-xs"
			>
				<Settings2Icon className="size-4" />
				Filter
			</Button>
		</div>
	);
}
