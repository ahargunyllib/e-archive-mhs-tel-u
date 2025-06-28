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
import { Textarea } from "@/shared/components/ui/textarea";
import { cn } from "@/shared/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, router } from "@inertiajs/react";
import { CalendarIcon, PaperclipIcon, Trash2Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";
import { useAuth } from "../../shared/hooks/use-auth";
import { AgendaSetTypes, AgendaStatuses } from "../../shared/lib/enums";
import type { Agenda } from "../../shared/types";

const EditAgendaSchema = z.object({
	date: z.date({
		message: "Tanggal tidak valid",
	}),
	name: z.string().min(1, "Nama kegitan tidak boleh kosong"),
	work_program: z.string().min(1, "Program kerja tidak boleh kosong"),
	set_type: z.number().min(1, "Nama himpunan tidak boleh kosong"),
	description: z.string().min(1, "Deskripsi tidak boleh kosong"),
	relationship: z.string().min(1, "Hubungan tidak boleh kosong"),
	estimated_cost: z.coerce.number(),
	proposal: z.instanceof(File).optional(),
	report: z.instanceof(File).optional(),
	status: z.number().min(1, "Status tidak boleh kosong"),
});

type EditAgendaRequest = z.infer<typeof EditAgendaSchema>;

type Props = {
	agenda: Agenda;
};

export default function EditAgenda({ agenda }: Props) {
	const { user } = useAuth();

	const form = useForm<EditAgendaRequest>({
		resolver: zodResolver(EditAgendaSchema),
		defaultValues: {
			date: new Date(agenda.date),
			name: agenda.name,
			work_program: agenda.work_program,
			set_type: agenda.set_type,
			description: agenda.description,
			relationship: agenda.relationship,
			estimated_cost: agenda.estimated_cost,
			proposal: undefined,
			report: undefined,
			status: agenda.status,
		},
	});

	const onSubmitHandler = form.handleSubmit((data) => {
		const formData = new FormData();
		formData.append("date", data.date.toISOString());
		formData.append("name", data.name);
		formData.append("work_program", data.work_program);
		formData.append("set_type", data.set_type.toString());
		formData.append("description", data.description);
		formData.append("relationship", data.relationship);
		formData.append("estimated_cost", data.estimated_cost.toString());
		if (data.proposal) {
			formData.append("proposal", data.proposal);
		}
		if (data.report) {
			formData.append("report", data.report);
		}
		formData.append("status", data.status.toString());
		router.post(`/dashboard/agendas/${agenda.id}`, formData);
	});

	return (
		<DashboardLayout>
			<div className="flex flex-row justify-between items-center">
				<div className="flex flex-col justify-between">
					<h1 className="font-bold text-xl text-[#F9FAFB]">
						Data Agenda Kegiatan Himpunan
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
								<BreadcrumbPage>
									Edit data agenda kegiatan himpunan
								</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</div>
			</div>

			<div className="flex flex-col gap-6 bg-white rounded-2xl px-6 py-5 border border-[#EAECF0]">
				<h1 className="font-bold text-xl text-[#101828]">
					Formulir Edit Data Agenda Kegiatan Himpunan
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
											<PopoverTrigger asChild disabled={user.role === 1}>
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
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel
											className="text-base font-medium text-[#1D2939]"
											htmlFor="name"
										>
											Nama Kegiatan
											<span className="text-red-500">*</span>
										</FormLabel>
										<FormControl>
											<Input
												id="name"
												placeholder="Masukkan nama kegiatan"
												{...field}
												disabled={user.role === 1}
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
								name="work_program"
								render={({ field }) => (
									<FormItem>
										<FormLabel
											className="text-base font-medium text-[#1D2939]"
											htmlFor="work_program"
										>
											Program Kerja
											<span className="text-red-500">*</span>
										</FormLabel>
										<FormControl>
											<Input
												id="work_program"
												placeholder="Masukkan program kerja"
												{...field}
												disabled={user.role === 1}
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
											Nama Himpunan
										</FormLabel>
										<Select
											onValueChange={(val) =>
												field.onChange(Number.parseInt(val))
											}
											value={field.value.toString()}
										>
											<FormControl>
												<SelectTrigger
													className="w-full"
													disabled={user.role === 1}
												>
													<SelectValue placeholder="Pilih nama himpunan" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{AgendaSetTypes.map((type) => (
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
						</div>
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel
										className="text-base font-medium text-[#1D2939]"
										htmlFor="description"
									>
										Deskripsi Kegiatan
										<span className="text-red-500">*</span>
									</FormLabel>
									<FormControl>
										<Textarea
											id="description"
											placeholder="Masukkan deskripsi kegiatan"
											className="resize-none"
											rows={4}
											{...field}
											disabled={user.role === 1}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<FormField
								control={form.control}
								name="relationship"
								render={({ field }) => (
									<FormItem>
										<FormLabel
											className="text-base font-medium text-[#1D2939]"
											htmlFor="relationship"
										>
											Hubungan dengan pihak eskternal
											<span className="text-red-500">*</span>
										</FormLabel>
										<FormControl>
											<Input
												id="relationship"
												placeholder="Masukkan kerjasama"
												{...field}
												disabled={user.role === 1}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="estimated_cost"
								render={({ field }) => (
									<FormItem>
										<FormLabel
											className="text-base font-medium text-[#1D2939]"
											htmlFor="estimated_cost"
										>
											Biaya Estimasi
											<span className="text-red-500">*</span>
										</FormLabel>
										<FormControl>
											<Input
												id="estimated_cost"
												placeholder="Masukkan biaya estimasi"
												className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
												{...field}
												disabled={user.role === 1}
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
								name="proposal"
								render={({ field: { value, onChange, ...restFieldProps } }) => (
									<FormItem>
										<FormLabel
											className="text-base font-medium text-[#1D2939]"
											htmlFor="proposal"
										>
											Proposal Kegiatan
										</FormLabel>
										<FormControl>
											<div className="p-1 border rounded-xl border-[#D0D5DD] flex flex-row gap-2 items-center">
												<Button
													id="proposal"
													type="button"
													variant="secondary"
													className="font-medium text-sm py-3 px-8 rounded-md h-fit"
													onClick={() => {
														const input = document.createElement("input");
														input.type = "file";
														input.accept = ".pdf,.docx,.doc";
														input.onchange = (event) => {
															const file = (event.target as HTMLInputElement)
																.files?.[0];
															if (file) {
																onChange(file);
															}
														};
														input.click();
													}}
													disabled={user.role === 1}
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
							<FormField
								control={form.control}
								name="report"
								render={({ field: { value, onChange, ...restFieldProps } }) => (
									<FormItem>
										<FormLabel
											className="text-base font-medium text-[#1D2939]"
											htmlFor="report"
										>
											Laporan Akhir Kegiatan
										</FormLabel>
										<FormControl>
											<div className="p-1 border rounded-xl border-[#D0D5DD] flex flex-row gap-2 items-center">
												<Button
													id="report"
													type="button"
													variant="secondary"
													className="font-medium text-sm py-3 px-8 rounded-md h-fit"
													onClick={() => {
														const input = document.createElement("input");
														input.type = "file";
														input.accept = ".pdf,.docx,.doc";
														input.onchange = (event) => {
															const file = (event.target as HTMLInputElement)
																.files?.[0];
															if (file) {
																onChange(file);
															}
														};
														input.click();
													}}
													disabled={user.role === 1}
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
						</div>
						{user.role === 1 && (
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<FormField
									control={form.control}
									name="status"
									render={({ field }) => (
										<FormItem>
											<FormLabel
												className="text-base font-medium text-[#1D2939]"
												htmlFor="status"
											>
												Status
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
														<SelectValue placeholder="Pilih status" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{AgendaStatuses.map((status) => (
														<SelectItem key={status.key} value={status.key}>
															{status.value}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						)}

						<div className="flex flex-row gap-2 justify-end">
							<Button
								type="button"
								variant="outline"
								className="font-medium text-sm py-3 px-8 rounded-md h-fit"
								asChild
							>
								<Link href="/dashboard/agendas">Batal</Link>
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
