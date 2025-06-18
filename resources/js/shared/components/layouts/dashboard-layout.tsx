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
import { useAuth } from "../../hooks/use-auth";
import { cn } from "../../lib/utils";
import type { SharedData } from "../../types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import RootLayout from "./root-layout";

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
	className = "",
}: {
	children: React.ReactNode;
	className?: string;
}) {
	const { url } = usePage<SharedData>();
	const { user } = useAuth();

	return (
		<RootLayout>
			<section className="min-h-dvh relative">
				<nav className="w-full flex items-center justify-between px-20 py-4">
					<img
						src="/logo.png"
						alt="Logo"
						className="relative h-12 object-contain"
					/>
					<div className="flex items-center rounded-full h-13 p-2 bg-white">
						{navItems.map((item) => (
							<Link key={item.name} href={item.href}>
								<Button
									variant="ghost"
									className={cn(
										"flex items-center gap-x-2 p-3 rounded-full",
										url.startsWith(item.href)
											? "bg-[#090E17] text-[#F9FAFB]"
											: "hover:bg-[#F2F4F7]/80 text-[#101828]",
									)}
								>
									<item.icon className="size-4" />
									<span className="font-medium text-sm">{item.name}</span>
								</Button>
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
								<Button className="bg-[#F2F4F7] hover:bg-[#F2F4F7]/80 text-[#101828] rounded-full h-13 !px-3">
									<Avatar>
										<AvatarImage
											src={`/storage/${user.photo_profile}`} // TODO
											alt="Avatar"
										/>
										<AvatarFallback>{user.name[0]}</AvatarFallback>
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

				<div className={cn("py-10 px-20 space-y-6", className)}>{children}</div>

				<div className="absolute -z-20 bg-[#F9FAFB] w-full h-full bottom-0" />
				<img
					src="/background.png"
					alt="Background"
					className="absolute inset-0 -z-10 object-cover w-full h-64"
				/>
			</section>
		</RootLayout>
	);
}
