import { Button } from "@/shared/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { usePagination } from "@/shared/hooks/use-pagination";
import { cn } from "@/shared/lib/utils";
import {
	ChevronDownIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
} from "lucide-react";

type Props = {
	currentPage: number;
	totalPages: number;
	limit: number;
	paginationItemsToDisplay?: number;
};

export default function Pagination({
	currentPage,
	totalPages,
	limit,
	paginationItemsToDisplay = 5,
}: Props) {
	const { pages, showLeftEllipsis, showRightEllipsis } = usePagination({
		currentPage,
		totalPages,
		paginationItemsToDisplay,
	});

	return (
		<div className="flex flex-row items-center justify-between">
			<div className="flex flex-row items-center gap-6">
				<Button
					disabled={currentPage === 1}
					variant="ghost"
					className="text-[#101828] hover:text-[#101828]/80 disabled:text-[#BFBFBF]"
				>
					<ChevronLeftIcon className="size-4" />
				</Button>
				<div className="flex flex-row items-center gap-2">
					{showLeftEllipsis && (
						<Button
							variant="ghost"
							className="text-[#101828] hover:text-[#101828]/80 disabled:text-[#BFBFBF]"
						>
							...
						</Button>
					)}
					{pages.map((page) => (
						<Button
							key={page}
							variant="ghost"
							className={cn(
								"text-sm font-medium",
								currentPage === page ? "text-[#101828]" : "text-[#BFBFBF]",
							)}
						>
							{page}
						</Button>
					))}
					{showRightEllipsis && (
						<Button
							variant="ghost"
							className="text-[#101828] hover:text-[#101828]/80 disabled:text-[#BFBFBF]"
						>
							...
						</Button>
					)}
				</div>
				<Button
					disabled={currentPage === totalPages}
					variant="ghost"
					className="text-[#101828] hover:text-[#101828]/80 disabled:text-[#BFBFBF]"
				>
					<ChevronRightIcon className="size-4" />
				</Button>
			</div>

			<div className="flex flex-row items-center gap-2">
				<span className="text-[#BFBFBF] text-sm">Item per halaman</span>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant="ghost"
							className="bg-white hover:bg-white/80 text-[#009180] rounded-full font-medium text-sm border border-[#009180]"
						>
							<ChevronDownIcon className="size-4" />
							{limit}
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						{[10, 20, 50, 100].map((limit) => (
							<DropdownMenuItem
								key={limit}
								onClick={() => {}}
								className="cursor-pointer"
							>
								{limit}
							</DropdownMenuItem>
						))}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
	);
}
