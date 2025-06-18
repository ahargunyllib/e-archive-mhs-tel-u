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
import { Calendar } from "@/shared/components/ui/calendar";
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
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/shared/components/ui/popover";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/shared/components/ui/select";
import { cn } from "@/shared/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, router } from "@inertiajs/react";
import { CalendarIcon, PaperclipIcon, Trash2Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";
import { AchievementSetTypes, AchievementTypes } from "../../shared/lib/enums";
import type { Achievement } from "../../shared/types";

const EditAchievementSchema = z.object({
	date: z.date({
		message: "Tanggal tidak valid",
	}),
	type: z.number().min(1, "Jenis prestasi tidak boleh kosong"),
	name: z.string().min(1, "Nama prestasi tidak boleh kosong"),
	set_type: z.number().min(1, "Tipe himpunan tidak boleh kosong"),
	certificate: z.instanceof(File),
});

type EditAchievementRequest = z.infer<typeof EditAchievementSchema>;

type Props = {
	achievement: Achievement;
};

export default function EditAchievement({ achievement }: Props) {
	const form = useForm<EditAchievementRequest>({
		resolver: zodResolver(EditAchievementSchema),
		defaultValues: {
			date: new Date(achievement.date),
			type: achievement.type,
			name: achievement.name,
			set_type: achievement.set_type,
			certificate: undefined,
		},
	});

	const onSubmitHandler = form.handleSubmit((data) => {
		const formData = new FormData();
		formData.append("date", data.date.toISOString());
		formData.append("type", data.type.toString());
		formData.append("name", data.name);
		formData.append("set_type", data.set_type.toString());
		if (data.certificate) {
			formData.append("certificate", data.certificate);
		}

		router.post("/dashboard/achievements/update", formData);
	});

	return (
		<DashboardLayout>
			<div className="flex flex-row justify-between items-center">
				<div className="flex flex-col justify-between">
					<h1 className="font-bold text-xl text-[#F9FAFB]">
						Data Prestasi Himpunan
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
								<BreadcrumbPage>Tambah data prestasi himpunan</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</div>
			</div>

			<div className="flex flex-col gap-6 bg-white rounded-2xl px-6 py-5 border border-[#EAECF0]">
				<h1 className="font-bold text-xl text-[#101828]">
					Formulir Tambah Prestasi Himpunan
				</h1>
				<Form {...form}>
					<form onSubmit={onSubmitHandler} className="space-y-6">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<FormField
								control={form.control}
								name="date"
								render={({ field }) => (
									<FormItem>
										<FormLabel
											className="text-base font-medium text-[#1D2939]"
											htmlFor="date"
										>
											Tanggal Kegiatan
											<span className="text-red-500">*</span>
										</FormLabel>
										<Popover>
											<PopoverTrigger asChild>
												<FormControl>
													<Button
														variant={"outline"}
														className={cn(
															"w-full pl-3 text-left font-normal h-12",
															!field.value && "text-muted-foreground",
														)}
													>
														{field.value ? (
															new Intl.DateTimeFormat("id-ID", {
																year: "numeric",
																month: "long",
																day: "numeric",
															}).format(field.value)
														) : (
															<span>Pick a date</span>
														)}
														<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
													</Button>
												</FormControl>
											</PopoverTrigger>
											<PopoverContent className="w-auto p-0" align="start">
												<Calendar
													mode="single"
													selected={field.value}
													onSelect={field.onChange}
													captionLayout="dropdown"
												/>
											</PopoverContent>
										</Popover>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="type"
								render={({ field }) => (
									<FormItem>
										<FormLabel
											className="text-base font-medium text-[#1D2939]"
											htmlFor="type"
										>
											Jenis Prestasi
										</FormLabel>
										<Select
											onValueChange={(val) =>
												field.onChange(Number.parseInt(val))
											}
											value={field.value.toString()}
										>
											<FormControl>
												<SelectTrigger className="w-full">
													<SelectValue placeholder="Pilih jenis prestasi" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{AchievementTypes.map((type) => (
													<SelectItem
														key={type.key}
														value={type.key.toString()}
													>
														{type.value}
													</SelectItem>
												))}
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
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel
											className="text-base font-medium text-[#1D2939]"
											htmlFor="name"
										>
											Nama Prestasi
											<span className="text-red-500">*</span>
										</FormLabel>
										<FormControl>
											<Input
												id="name"
												placeholder="Masukkan nama prestasi"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
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
												{AchievementSetTypes.map((setType) => (
													<SelectItem
														key={setType.key}
														value={setType.key.toString()}
													>
														{setType.value}
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
							name="certificate"
							render={({ field: { value, onChange, ...restFieldProps } }) => (
								<FormItem>
									<FormLabel
										className="text-base font-medium text-[#1D2939]"
										htmlFor="certificate"
									>
										Sertifikat prestasi
									</FormLabel>
									<FormControl>
										<div className="p-1 border rounded-xl border-[#D0D5DD] flex flex-row gap-2 items-center">
											<Button
												id="certificate"
												type="button"
												variant="secondary"
												className="font-medium text-sm py-3 px-8 rounded-md h-fit"
												onClick={() => {
													const input = document.createElement("input");
													input.type = "file";
													input.accept = "image/*,.doc,.docx,.pdf";
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
								className="font-medium text-sm py-3 px-8 rounded-md h-fit"
								asChild
							>
								<Link href="/dashboard/achievements">Batal</Link>
							</Button>
							<Button
								type="submit"
								className="bg-[#17C3AF] hover:bg-[#17C3AF]/80 text-white font-medium text-sm py-3 px-8 rounded-md h-fit"
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
