import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/shared/components/ui/chart";
import { PlusIcon } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

export default function AchievementChartCard() {
	const chartConfig = {
		desktop: {
			label: "Desktop",
			color: "var(--chart-1)",
		},
		mobile: {
			label: "Mobile",
			color: "var(--chart-2)",
		},
	} satisfies ChartConfig;

	const chartData = [
		{
			month: "January",
			desktop: 186,
			mobile: 80,
		},
		{
			month: "February",
			desktop: 305,
			mobile: 200,
		},
		{ month: "March", desktop: 237, mobile: 120 },
		{ month: "April", desktop: 73, mobile: 190 },
		{ month: "May", desktop: 209, mobile: 130 },
		{ month: "June", desktop: 214, mobile: 140 },
	];

	return (
		<div className="bg-white rounded-2xl p-6 border border-[#EAECF0] space-y-6">
			<div className="space-y-1">
				<span className="font-medium text-[#080C18]">
					Grafik prestasi himpunan
				</span>
				<div className="flex flex-row items-center gap-2">
					<p className="text-[#98A2B3] text-sm">Peningkatan prestasi</p>
					<div className="flex items-center gap-1">
						<PlusIcon className="size-3 text-[#00BF11]" />
						<span className="text-[#00BF11] font-semibold text-sm">5.6%</span>
					</div>
				</div>
			</div>
			<div>
				<ChartContainer config={chartConfig} className="aspect-auto h-48">
					<LineChart
						accessibilityLayer
						data={chartData}
						margin={{
							left: 12,
							right: 12,
						}}
					>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="month"
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							tickFormatter={(value) => value.slice(0, 3)}
						/>
						<ChartTooltip cursor={false} content={<ChartTooltipContent />} />
						<Line
							dataKey="desktop"
							type="monotone"
							stroke="var(--color-desktop)"
							strokeWidth={2}
							dot={false}
						/>
						<Line
							dataKey="mobile"
							type="monotone"
							stroke="var(--color-mobile)"
							strokeWidth={2}
							dot={false}
						/>
					</LineChart>
				</ChartContainer>
			</div>
		</div>
	);
}
