import DashboardLayout from "@/shared/components/layouts/dashboard-layout";
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/shared/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, router } from "@inertiajs/react";
import { PaperclipIcon, Trash2Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";
import { UserRoles } from "../../shared/lib/enums";

const CreateUserSchema = z
	.object({
		name: z.string().min(1, "Nama tidak boleh kosong"),
		username: z.string().min(1, "Username tidak boleh kosong"),
		email: z
			.string()
			.email("Email tidak valid")
			.min(1, "Email tidak boleh kosong"),
		role: z.number().min(1, "Role tidak boleh kosong"),
		password: z.string().min(6, "Password harus minimal 6 karakter"),
		confirmPassword: z
			.string()
			.min(6, "Konfirmasi password harus minimal 6 karakter"),
		avatar: z.instanceof(File).optional(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Password dan konfirmasi password harus sama",
	});

type CreateUserRequest = z.infer<typeof CreateUserSchema>;

export default function CreateUser() {
	const form = useForm<CreateUserRequest>({
		resolver: zodResolver(CreateUserSchema),
		defaultValues: {
			name: "",
			username: "",
			email: "",
			role: 1,
			password: "",
			confirmPassword: "",
			avatar: undefined,
		},
	});

	const onSubmitHandler = form.handleSubmit((data) => {
		router.post("/dashboard/users", data);
	});

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
								<BreadcrumbPage>Tambah users</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</div>
			</div>

			<div className="flex flex-col gap-6 bg-white rounded-2xl px-6 py-5 border border-[#EAECF0]">
				<h1 className="font-bold text-xl text-[#101828]">
					Formulir Tambah User
				</h1>
				<Form {...form}>
					<form onSubmit={onSubmitHandler} className="space-y-6">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel
											className="text-base font-medium text-[#1D2939]"
											htmlFor="name"
										>
											Nama
											<span className="text-red-500">*</span>
										</FormLabel>
										<FormControl>
											<Input id="name" placeholder="Masukkan nama" {...field} />
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
											className="text-base font-medium text-[#1D2939]"
											htmlFor="username"
										>
											Username
											<span className="text-red-500">*</span>
										</FormLabel>
										<FormControl>
											<Input
												id="username"
												placeholder="Masukkan username"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel
											className="text-base font-medium text-[#1D2939]"
											htmlFor="email"
										>
											Email
											<span className="text-red-500">*</span>
										</FormLabel>
										<FormControl>
											<Input
												id="email"
												type="email"
												placeholder="Masukkan email"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="role"
								render={({ field }) => (
									<FormItem>
										<FormLabel
											className="text-base font-medium text-[#1D2939]"
											htmlFor="role"
										>
											Role
										</FormLabel>
										<Select
											onValueChange={(val) =>
												field.onChange(Number.parseInt(val))
											}
											value={field.value.toString()}
										>
											<FormControl>
												<SelectTrigger className="w-full">
													<SelectValue placeholder="Pilih role" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{UserRoles.map((role) => {
													return (
														<SelectItem
															key={role.key}
															value={role.key.toString()}
														>
															{role.value}
														</SelectItem>
													);
												})}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel
											className="text-base font-medium text-[#1D2939]"
											htmlFor="password"
										>
											Password
											<span className="text-red-500">*</span>
										</FormLabel>
										<FormControl>
											<Input
												id="password"
												type="password"
												placeholder="Masukkan password"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="confirmPassword"
								render={({ field }) => (
									<FormItem>
										<FormLabel
											className="text-base font-medium text-[#1D2939]"
											htmlFor="confirmPassword"
										>
											Konfirmasi Password
											<span className="text-red-500">*</span>
										</FormLabel>
										<FormControl>
											<Input
												id="confirmPassword"
												type="password"
												placeholder="Konfirmasi password"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<FormField
							control={form.control}
							name="avatar"
							render={({ field: { value, onChange, ...restFieldProps } }) => (
								<FormItem>
									<FormLabel
										className="text-base font-medium text-[#1D2939]"
										htmlFor="avatar"
									>
										Avatar
									</FormLabel>
									<FormControl>
										<div className="p-1 border rounded-xl border-[#D0D5DD] flex flex-row gap-2 items-center">
											<Button
												id="avatar"
												type="button"
												variant="secondary"
												className="font-medium text-xs py-3 px-8 rounded-md h-fit"
												onClick={() => {
													const input = document.createElement("input");
													input.type = "file";
													input.accept = "image/*";
													input.onchange = (event) => {
														const file = (event.target as HTMLInputElement)
															.files?.[0];
														if (file) {
															onChange(file);
														}
													};
													input.click();
												}}
											>
												<PaperclipIcon className="size-4" />
												Upload File
											</Button>
											{value ? (
												<div className="w-full flex flex-row items-center justify-between">
													<span className="text-sm text-[#101828]">
														{value.name}
													</span>
													<Button
														type="button"
														variant="ghost"
														className="h-8 w-8 p-0"
														onClick={() => onChange(undefined)}
													>
														<Trash2Icon className="size-4" />
													</Button>
												</div>
											) : (
												<span className="text-sm text-muted-foreground/80">
													Tidak ada file yang dipilih
												</span>
											)}
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="flex flex-row gap-2 justify-end">
							<Button
								type="button"
								variant="outline"
								className="font-medium text-xs py-3 px-8 rounded-md h-fit"
								asChild
							>
								<Link href="/dashboard/users">Batal</Link>
							</Button>
							<Button
								type="submit"
								className="bg-[#17C3AF] hover:bg-[#17C3AF]/80 text-white font-medium text-xs py-3 px-8 rounded-md h-fit"
							>
								Simpan
							</Button>
						</div>
					</form>
				</Form>
			</div>
		</DashboardLayout>
	);
}
