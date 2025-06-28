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
import {
	MemberBatchYears,
	MemberPeriods,
	MemberSetTypes,
} from "../../shared/lib/enums";
import type { Member } from "../../shared/types";

const EditMemberSchema = z.object({
	name: z.string().min(1, "Nama tidak boleh kosong"),
	address: z.string().min(1, "Alamat tidak boleh kosong"),
	contact: z.string().min(1, "Kontak tidak boleh kosong"),
	division: z.string().min(1, "Divisi tidak boleh kosong"),
	set_type: z.number().min(1, "Nama himpunan tidak boleh kosong"),
	batch_year: z.number().min(1, "Angkatan tidak boleh kosong"),
	period: z.number().min(1, "Periode tidak boleh kosong"),
	avatar: z.instanceof(File).optional(),
});

type EditMemberRequest = z.infer<typeof EditMemberSchema>;

type Props = {
	member: Member;
};

export default function EditMember({ member }: Props) {
	const form = useForm<EditMemberRequest>({
		resolver: zodResolver(EditMemberSchema),
		defaultValues: {
			name: member.name,
			address: member.address,
			contact: member.contact,
			division: member.division,
			set_type: member.set_type,
			batch_year: member.batch_year,
			period: member.period,
			avatar: undefined,
		},
	});

	const onSubmitHandler = form.handleSubmit((data) => {
		const formData = new FormData();
		formData.append("name", data.name);
		formData.append("address", data.address);
		formData.append("contact", data.contact);
		formData.append("division", data.division);
		formData.append("set_type", data.set_type.toString());
		formData.append("batch_year", data.batch_year.toString());
		formData.append("period", data.period.toString());
		if (data.avatar) {
			formData.append("avatar", data.avatar);
		}
		router.post(`/dashboard/members/${member.id}`, formData);
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
								<BreadcrumbPage>Detail data anggota himpunan</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</div>
			</div>

			<div className="flex flex-col gap-6 bg-white rounded-2xl px-6 py-5 border border-[#EAECF0]">
				<h1 className="font-bold text-xl text-[#101828]">
					Detail Data Anggota Himpunan
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
											<Input
												id="name"
												placeholder="Masukkan nama"
												{...field}
												disabled
											/>
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
												disabled
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
												disabled
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
										<FormControl>
											<Input
												id="division"
												placeholder="Masukkan divisi"
												{...field}
												disabled
											/>
										</FormControl>
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
										Nama Himpunan
										<span className="text-red-500">*</span>
									</FormLabel>
									<Select
										onValueChange={(val) =>
											field.onChange(Number.parseInt(val))
										}
										value={field.value.toString()}
									>
										<FormControl>
											<SelectTrigger className="w-full" disabled>
												<SelectValue placeholder="Pilih nama himpunan" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{MemberSetTypes.map((type) => (
												<SelectItem key={type.key} value={type.key}>
													{type.value}
												</SelectItem>
											))}
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
												<SelectTrigger className="w-full" disabled>
													<SelectValue placeholder="Pilih angkatan" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{MemberBatchYears.map((year) => (
													<SelectItem key={year.key} value={year.key}>
														{year.value}
													</SelectItem>
												))}
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
												<SelectTrigger className="w-full" disabled>
													<SelectValue placeholder="Pilih periode" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{MemberPeriods.map((period) => (
													<SelectItem key={period.key} value={period.key}>
														{period.value}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
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
												className="font-medium text-sm py-3 px-8 rounded-md h-fit"
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
												disabled
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
											) : member.photo_profile ? (
												<a
													target="_blank"
													href={`/storage/${member.photo_profile}`}
													className="text-sm text-blue-500 hover:text-blue-500/80 hover:underline"
													rel="noreferrer"
												>
													Avatar
												</a>
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
								className="font-medium text-sm py-3 px-8 rounded-md h-fit"
								asChild
							>
								<Link href="/dashboard/members">Kembali</Link>
							</Button>
						</div>
					</form>
				</Form>
			</div>
		</DashboardLayout>
	);
}
