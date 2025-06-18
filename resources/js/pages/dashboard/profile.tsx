import DashboardLayout from "@/shared/components/layouts/dashboard-layout";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/shared/components/ui/avatar";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/shared/components/ui/breadcrumb";
import { Button } from "@/shared/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { useAuth } from "@/shared/hooks/use-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "@inertiajs/react";
import { PenLineIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const UpdateProfileSchema = z.object({
	name: z.string().min(1, "Nama tidak boleh kosong"),
	username: z.string().min(1, "Username tidak boleh kosong"),
	email: z
		.string()
		.email("Email tidak valid")
		.min(1, "Email tidak boleh kosong"),
});

type UpdateProfileRequest = z.infer<typeof UpdateProfileSchema>;

export default function Profile() {
	const { user } = useAuth();
	const [isEditing, setIsEditing] = useState(false);
	const form = useForm<UpdateProfileRequest>({
		resolver: zodResolver(UpdateProfileSchema),
		defaultValues: {
			name: user.name,
			username: user.username,
			email: user.email,
		},
	});

	const onSubmitHandler = form.handleSubmit((data) => {
		router.post("/dashboard/profile", data);
		setIsEditing(false);
	});

	return (
		<DashboardLayout>
			<div className="flex flex-row justify-between items-center">
				<div className="flex flex-col justify-between">
					<h1 className="font-bold text-xl text-[#F9FAFB]">Profile</h1>
					<Breadcrumb>
						<BreadcrumbList>
							<BreadcrumbItem>
								<BreadcrumbLink href="/dashboard/home">
									Dashboard
								</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator />
							<BreadcrumbItem>
								<BreadcrumbPage>Profile</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</div>
				<div className="flex flex-row items-center gap-4">
					{!isEditing && (
						<Button
							className="bg-[#F2F4F7] hover:bg-[#F2F4F7]/80 text-[#101828] rounded-full font-medium text-xs"
							onClick={() => setIsEditing(true)}
						>
							<PenLineIcon className="size-4" />
							Ubah Profile
						</Button>
					)}
				</div>
			</div>

			<Form {...form}>
				<form
					onSubmit={onSubmitHandler}
					className="flex flex-row gap-6 bg-white rounded-2xl px-6 py-5 border border-[#EAECF0]"
				>
					<div className="flex flex-col gap-4">
						<div className="flex flex-col items-center justify-center gap-2 rounded-xl bg-[#F7F6FA] p-16">
							<div className="relative">
								<Avatar className="size-32 border">
									<AvatarImage
										src={`/storage/${user.photo_profile}`}
										alt="User Avatar"
									/>
									<AvatarFallback className="size-32 border">
										{form.getValues("username")[0].toUpperCase() || "-"}
									</AvatarFallback>
								</Avatar>
								{isEditing && (
									<Button
										variant="outline"
										className="absolute bottom-0 right-0 aspect-square !p-1"
									>
										<PenLineIcon className="size-3" />
									</Button>
								)}
							</div>
							<span className="font-semibold text-[#2A282F]">
								{form.getValues("name")}
							</span>
						</div>
						{isEditing && (
							<Button type="button" variant="destructive">
								Hapus gambar
							</Button>
						)}
					</div>
					<div className="flex flex-col gap-6 w-full">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel
										htmlFor="name"
										className="text-base font-medium text-[#1D2939]"
									>
										Nama
										<span className="text-red-500">*</span>
									</FormLabel>
									<FormControl>
										<Input
											id="name"
											placeholder="Masukkan nama"
											{...field}
											disabled={!isEditing}
											className="w-full"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="username"
							render={({ field }) => (
								<FormItem>
									<FormLabel
										htmlFor="username"
										className="text-base font-medium text-[#1D2939]"
									>
										Username
										<span className="text-red-500">*</span>
									</FormLabel>
									<FormControl>
										<Input
											id="username"
											placeholder="Masukkan username"
											{...field}
											disabled={!isEditing}
											className="w-full"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel
										htmlFor="email"
										className="text-base font-medium text-[#1D2939]"
									>
										Email
										<span className="text-red-500">*</span>
									</FormLabel>
									<FormControl>
										<Input
											id="email"
											placeholder="Masukkan email"
											type="email"
											{...field}
											disabled={!isEditing}
											className="w-full"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="flex flex-row justify-end gap-2">
							{isEditing && (
								<>
									<Button
										type="button"
										variant="outline"
										onClick={() => {
											setIsEditing(false);
											form.reset();
										}}
										className="font-medium text-xs py-3 px-8 rounded-md h-fit"
									>
										Batal
									</Button>
									<Button
										type="submit"
										className="bg-[#17C3AF] hover:bg-[#17C3AF]/80 text-white font-medium text-xs py-3 px-8 rounded-md h-fit"
									>
										Simpan Perubahan
									</Button>
								</>
							)}
						</div>
					</div>
				</form>
			</Form>
		</DashboardLayout>
	);
}
