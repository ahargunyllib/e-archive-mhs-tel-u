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
import { Link } from "@inertiajs/react";
import { useForm } from "react-hook-form";
import z from "zod";

const CreateMemberSchema = z.object({
	name: z.string().min(1, "Nama tidak boleh kosong"),
	address: z.string().min(1, "Alamat tidak boleh kosong"),
	contact: z.string().min(1, "Kontak tidak boleh kosong"),
	division: z.number().min(1, "Divisi tidak boleh kosong"),
	set_type: z.number().min(1, "Tipe himpunan tidak boleh kosong"),
	batch_year: z.number().min(1, "Angkatan tidak boleh kosong"),
	period: z.number().min(1, "Periode tidak boleh kosong"),
	ipk: z.coerce
		.number()
		.min(0, "IPK tidak boleh kurang dari 0")
		.max(4, "IPK tidak boleh lebih dari 4"),
	tak: z.coerce
		.number()
		.min(0, "TAK tidak boleh kurang dari 0")
		.max(100, "TAK tidak boleh lebih dari 100"),
	erpt_score: z.coerce
		.number()
		.min(0, "Skor ERPT tidak boleh kurang dari 0")
		.max(100, "Skor ERPT tidak boleh lebih dari 100"),
});

type CreateMemberRequest = z.infer<typeof CreateMemberSchema>;

export default function CreateMember() {
	const form = useForm<CreateMemberRequest>({
		resolver: zodResolver(CreateMemberSchema),
		defaultValues: {
			name: "",
			address: "",
			contact: "",
			division: 1,
			set_type: 1,
			batch_year: 1,
			period: 1,
			ipk: 0,
			tak: 0,
			erpt_score: 0,
		},
	});

	const onSubmitHandler = form.handleSubmit((data) => {
		// Handle form submission logic here
		console.log("Form submitted with data:", data);
	});

	return (
		<DashboardLayout>
			<div className="flex flex-row justify-between items-center">
				<div className="flex flex-col justify-between">
					<h1 className="font-bold text-xl text-[#F9FAFB]">
						Data Anggota Himpunan
					</h1>
					<Breadcrumb>
						<BreadcrumbList>
							<BreadcrumbItem>
								<BreadcrumbLink href="/dashboard/home">
									Dashboard
								</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator />
							<BreadcrumbItem>
								<BreadcrumbPage>Tambah data anggota himpunan</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</div>
			</div>

			<div className="flex flex-col gap-6 bg-white rounded-2xl px-6 py-5 border border-[#EAECF0]">
				<h1 className="font-bold text-xl text-[#101828]">
					Formulir Tambah Data Anggota Himpunan
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
								name="address"
								render={({ field }) => (
									<FormItem>
										<FormLabel
											className="text-base font-medium text-[#1D2939]"
											htmlFor="address"
										>
											Alamat
											<span className="text-red-500">*</span>
										</FormLabel>
										<FormControl>
											<Input
												id="address"
												placeholder="Masukkan alamat"
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
								name="contact"
								render={({ field }) => (
									<FormItem>
										<FormLabel
											className="text-base font-medium text-[#1D2939]"
											htmlFor="contact"
										>
											Kontak
											<span className="text-red-500">*</span>
										</FormLabel>
										<FormControl>
											<Input
												id="contact"
												placeholder="Masukkan kontak"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="division"
								render={({ field }) => (
									<FormItem>
										<FormLabel
											className="text-base font-medium text-[#1D2939]"
											htmlFor="division"
										>
											Divisi
										</FormLabel>
										<Select
											onValueChange={(val) =>
												field.onChange(Number.parseInt(val))
											}
											value={field.value.toString()}
										>
											<FormControl>
												<SelectTrigger className="w-full">
													<SelectValue placeholder="Pilih divisi" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="1">Divisi 1</SelectItem>
												<SelectItem value="2">Divisi 2</SelectItem>
												<SelectItem value="3">Divisi 3</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<FormField
							control={form.control}
							name="set_type"
							render={({ field }) => (
								<FormItem>
									<FormLabel
										className="text-base font-medium text-[#1D2939]"
										htmlFor="set_type"
									>
										Tipe Himpunan
										<span className="text-red-500">*</span>
									</FormLabel>
									<Select
										onValueChange={(val) =>
											field.onChange(Number.parseInt(val))
										}
										value={field.value.toString()}
									>
										<FormControl>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Pilih tipe himpunan" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="1">Himpunan 1</SelectItem>
											<SelectItem value="2">Himpunan 2</SelectItem>
											<SelectItem value="3">Himpunan 3</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<FormField
								control={form.control}
								name="batch_year"
								render={({ field }) => (
									<FormItem>
										<FormLabel
											className="text-base font-medium text-[#1D2939]"
											htmlFor="batch_year"
										>
											Angkatan
											<span className="text-red-500">*</span>
										</FormLabel>
										<Select
											onValueChange={(val) =>
												field.onChange(Number.parseInt(val))
											}
											value={field.value.toString()}
										>
											<FormControl>
												<SelectTrigger className="w-full">
													<SelectValue placeholder="Pilih angkatan" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="1">Angkatan 1</SelectItem>
												<SelectItem value="2">Angkatan 2</SelectItem>
												<SelectItem value="3">Angkatan 3</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="period"
								render={({ field }) => (
									<FormItem>
										<FormLabel
											className="text-base font-medium text-[#1D2939]"
											htmlFor="period"
										>
											Periode
											<span className="text-red-500">*</span>
										</FormLabel>
										<Select
											onValueChange={(val) =>
												field.onChange(Number.parseInt(val))
											}
											value={field.value.toString()}
										>
											<FormControl>
												<SelectTrigger className="w-full">
													<SelectValue placeholder="Pilih periode" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="1">Periode 1</SelectItem>
												<SelectItem value="2">Periode 2</SelectItem>
												<SelectItem value="3">Periode 3</SelectItem>
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
								name="ipk"
								render={({ field }) => (
									<FormItem>
										<FormLabel
											className="text-base font-medium text-[#1D2939]"
											htmlFor="ipk"
										>
											IPK
											<span className="text-red-500">*</span>
										</FormLabel>
										<FormControl>
											<Input
												id="ipk"
												placeholder="Masukkan IPK"
												className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="tak"
								render={({ field }) => (
									<FormItem>
										<FormLabel
											className="text-base font-medium text-[#1D2939]"
											htmlFor="tak"
										>
											TAK
											<span className="text-red-500">*</span>
										</FormLabel>
										<FormControl>
											<Input
												id="tak"
												placeholder="Masukkan TAK"
												className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
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
							name="erpt_score"
							render={({ field }) => (
								<FormItem>
									<FormLabel
										className="text-base font-medium text-[#1D2939]"
										htmlFor="erpt_score"
									>
										Skor ERPT
										<span className="text-red-500">*</span>
									</FormLabel>
									<FormControl>
										<Input
											id="erpt_score"
											placeholder="Masukkan skor ERPT"
											className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
											{...field}
										/>
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
								<Link href="/dashboard/members">Batal</Link>
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
