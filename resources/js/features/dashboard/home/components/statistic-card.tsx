type Props = {
	icon: React.ComponentType<{ className?: string }>;
	title: string;
	value: number;
	label: string;
};

export default function StatisticCard({ icon, title, value, label }: Props) {
	const Icon = icon;

	return (
		<div className="bg-white rounded-2xl p-6 border border-[#EAECF0] space-y-6">
			<div className="flex flex-row items-center gap-4">
				<div className="rounded-full bg-[#CFF8F3] text-[#17C3AF] p-2">
					<Icon className="size-6" />
				</div>
				<span className="font-medium text-[#080C18] w-3/5">{title}</span>
			</div>
			<div className="flex flex-row items-end">
				<span className="font-semibold text-5xl text-[#080C18]">{value}</span>
				<span className="text-sm text-[#080C18]">{label}</span>
			</div>
		</div>
	);
}
