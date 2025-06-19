import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/shared/components/ui/chart";
import { PlusIcon } from "lucide-react";
import { useMemo } from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import type { AchievementTypeMap } from "../../../../shared/lib/enums";

type Props = {
	achievementStatistics: {
		year: string;
		count: number;
		type: keyof typeof AchievementTypeMap;
	}[];
};

export default function AchievementChartCard({ achievementStatistics }: Props) {
	const chartConfig = {
		1: {
			label: "Akademik",
			color: "var(--chart-1)",
		},
		2: {
			label: "Non-Akademik",
			color: "var(--chart-2)",
		},
	} satisfies ChartConfig;

	const chartData = useMemo(() => {
		const data: {
			year: string;
			[x: number]: number;
		}[] = [];

		for (const stat of achievementStatistics) {
			const existing = data.find((d) => d.year === stat.year);
			if (existing) {
				existing[stat.type] += stat.count;
				continue;
			}

			const newEntry: { year: string; [x: number]: number } = {
				year: stat.year,
			};
			newEntry[stat.type] = stat.count;
			data.push(newEntry);
		}

		const sortedData = data.sort((a, b) => a.year.localeCompare(b.year));
		return sortedData;
	}, [achievementStatistics]);

	const trend = useMemo(() => {
		if (chartData.length < 2) return "0%";
		const secondLastYear = chartData[chartData.length - 2];
		const lastYear = chartData[chartData.length - 1];

		const secondLastYearCount =
			(secondLastYear[1] || 0) + (secondLastYear[2] || 0);
		const lastYearCount = (lastYear[1] || 0) + (lastYear[2] || 0);

		const increase = lastYearCount - secondLastYearCount;
		const percentage =
			secondLastYearCount === 0 ? 0 : (increase / secondLastYearCount) * 100;
		return `${percentage.toFixed(1)}%`;
	}, [chartData]);

	return (
		<div className="bg-white rounded-2xl p-6 border border-[#EAECF0] space-y-6">
			<div className="space-y-1">
				<span className="font-medium text-[#080C18]">
					Grafik prestasi himpunan
				</span>
				<div className="flex flex-row items-center gap-2">
					<p className="text-[#98A2B3] text-sm">Peningkatan prestasi</p>
					<div className="flex items-center gap-1">
						<span className="text-[#00BF11] font-semibold text-sm">
							{trend}
						</span>
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
							dataKey="year"
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							// tickFormatter={(value) => value.slice(0, 3)}
						/>
						<ChartTooltip cursor={false} content={<ChartTooltipContent />} />
						<Line
							dataKey="1"
							type="monotone"
							stroke="var(--color-1)"
							strokeWidth={2}
							dot={false}
						/>
						<Line
							dataKey="2"
							type="monotone"
							stroke="var(--color-2)"
							strokeWidth={2}
							dot={false}
						/>
					</LineChart>
				</ChartContainer>
			</div>
		</div>
	);
}
