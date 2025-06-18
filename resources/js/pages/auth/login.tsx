import { Card } from "@/shared/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, router } from "@inertiajs/react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../shared/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../../shared/components/ui/form";
import { Input } from "../../shared/components/ui/input";

const LoginSchema = z.object({
	email: z
		.string()
		.email("Email tidak valid")
		.min(1, "Email tidak boleh kosong"),
	password: z.string().min(6, "Kata sandi harus memiliki minimal 6 karakter"),
});

type LoginRequest = z.infer<typeof LoginSchema>;

export default function Login() {
	const [isVisible, setIsVisible] = useState<boolean>(false);

	const toggleVisibility = () => setIsVisible((prevState) => !prevState);

	const form = useForm<LoginRequest>({
		defaultValues: {
			email: "",
			password: "",
		},
		resolver: zodResolver(LoginSchema),
	});

	const onSubmitHandler = form.handleSubmit((data) => {
		router.post("/login", data);
	});

	return (
		<section className="min-h-dvh relative flex items-center justify-center">
			<Card className="mx-auto w-full max-w-md flex flex-col items-center justify-center gap-y-16 px-6 pt-6 pb-10">
				<img
					src="/logo.png"
					alt="Logo"
					className="relative h-12 object-contain"
				/>
				<div className="space-y-12 w-full flex flex-col items-center">
					<Form {...form}>
						<form className="space-y-8 w-full" onSubmit={onSubmitHandler}>
							{/* Header */}
							<div className="space-y-2 text-center">
								<h1 className="font-bold text-black text-2xl">Masuk</h1>
								<p className="font-medium text-[#344054] text-sm">
									Gunakan kredensial resmi untuk mengakses dashboard.
								</p>
							</div>

							{/* Form Fields */}
							<div className="space-y-6">
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel
												className="text-base font-medium text-[#1D2939]"
												htmlFor="email"
											>
												Email<span className="text-red-500">*</span>
											</FormLabel>
											<FormControl>
												<Input
													id="email"
													placeholder="Masukkan email"
													type="email"
													className="w-full"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="password"
									render={({ field }) => (
										<FormItem>
											<FormLabel
												className="text-base font-medium text-[#1D2939]"
												htmlFor="password"
											>
												Kata Sandi<span className="text-red-500">*</span>
											</FormLabel>
											<FormControl>
												<div className="relative">
													<Input
														id="password"
														placeholder="Masukkan kata sandi"
														className="w-full pe-9"
														type={isVisible ? "text" : "password"}
														{...field}
													/>
													<button
														className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
														type="button"
														onClick={toggleVisibility}
														aria-label={
															isVisible ? "Hide password" : "Show password"
														}
														aria-pressed={isVisible}
														aria-controls="password"
													>
														{isVisible ? (
															<EyeOffIcon size={16} aria-hidden="true" />
														) : (
															<EyeIcon size={16} aria-hidden="true" />
														)}
													</button>
												</div>
											</FormControl>
											<FormMessage />
											<Link
												href="/forgot-password"
												className="text-[#101828] text-sm font-medium hover:underline text-end"
											>
												Lupa kata sandi?
											</Link>
										</FormItem>
									)}
								/>
							</div>

							<Button className="bg-[#17C3AF] hover:bg-[#17C3AF]/80 text-white w-full font-medium text-sm py-6 px-12 rounded-xl">
								Masuk
							</Button>
						</form>
					</Form>
					<span className="text-[#667085] font-semibold text-sm">
						© E-Archive Kemahasiswaan 2025 - All Rights Reserved
					</span>
				</div>
			</Card>

			<img
				src="/background.png"
				alt="Background"
				className="absolute inset-0 -z-10 object-cover w-full h-full"
			/>
		</section>
	);
}
