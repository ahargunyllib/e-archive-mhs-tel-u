import { Link, usePage } from "@inertiajs/react";
import {
	BellIcon,
	CalendarDaysIcon,
	ChevronDownIcon,
	FolderIcon,
	HomeIcon,
	LogOutIcon,
	StarIcon,
	UserIcon,
	UsersIcon,
} from "lucide-react";
import { cn } from "../../../lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { Button } from "../button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../dropdown-menu";

const navItems = [
	{ name: "Dashboard", icon: HomeIcon, href: "/dashboard/home" },
	{ name: "Users", icon: UsersIcon, href: "/dashboard/users" },
	{
		name: "Data Anggota Himpunan",
		icon: FolderIcon,
		href: "/dashboard/members",
	},
	{
		name: "Data Agenda Kegiatan Himpunan",
		icon: CalendarDaysIcon,
		href: "/dashboard/agendas",
	},
	{
		name: "Data Prestasi Himpunan",
		icon: StarIcon,
		href: "/dashboard/achievements",
	},
];

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { url } = usePage();
	return (
		<section className="min-h-dvh relative">
			<nav className="w-full flex items-center justify-between px-20 py-4">
				<img
					src="/logo.png"
					alt="Logo"
					className="relative h-12 object-contain"
				/>
				<div className="flex items-center bg-[#F2F4F7] rounded-full h-13 p-2">
					{navItems.map((item) => (
						<Link
							key={item.name}
							href={item.href}
							className={cn(
								"flex items-center gap-x-2 p-3",
								url.startsWith(item.href) &&
									"bg-[#090E17] text-[#F9FAFB] rounded-full",
							)}
						>
							<item.icon className="size-4" />
							<span className="font-medium text-xs">{item.name}</span>
						</Link>
					))}
				</div>

				<div className="flex items-center gap-x-1">
					<Button className="bg-[#F2F4F7] hover:bg-[#F2F4F7]/80 text-[#101828] rounded-full aspect-square h-13">
						<BellIcon // TODO
							className="size-4"
						/>
					</Button>

					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button className="bg-[#F2F4F7] hover:bg-[#F2F4F7]/80 text-[#101828] rounded-full h-13">
								<Avatar>
									<AvatarImage
										src="" // TODO
										alt="Avatar"
									/>
									<AvatarFallback>CN</AvatarFallback>
								</Avatar>
								<ChevronDownIcon className="size-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuItem>
								<Link
									href="/dashboard/profile"
									className="w-full flex items-center gap-x-2"
								>
									<UserIcon /> Profil
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Link
									href="/dashboard/settings" // TODO
									className="w-full flex items-center gap-x-2"
								>
									<LogOutIcon /> Logout
								</Link>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</nav>

			<div className="py-10 px-20">{children}</div>

			<img
				src="/background.png"
				alt="Background"
				className="absolute inset-0 -z-20 object-cover w-full h-full"
			/>
			<div className="absolute -z-10 bg-white w-full h-[70%] bottom-0" />
		</section>
	);
}
