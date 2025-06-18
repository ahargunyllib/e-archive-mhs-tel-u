export const UserRoleMap = {
	1: "Admin",
	2: "Mahasiswa",
	3: "Dosen",
} as const;

export const UserRoles = Object.entries(UserRoleMap).map(([key, value]) => ({
	key,
	value,
}));

export const MemberDivisonMap = {
	1: "Kaderisasi",
} as const;

export const MemberDivisions = Object.entries(MemberDivisonMap).map(
	([key, value]) => ({
		key,
		value,
	}),
);

export const MemberSetTypeMap = {
	1: "Teknik Industri",
	2: "Sistem Informasi",
	3: "Teknik Logistik",
} as const;

export const MemberSetTypes = Object.entries(MemberSetTypeMap).map(
	([key, value]) => ({
		key,
		value,
	}),
);

export const MemberBatchYearMap = {
	1: "2020",
	2: "2021",
	3: "2022",
	4: "2023",
	5: "2024",
	6: "2025",
	7: "2026",
} as const;

export const MemberBatchYears = Object.entries(MemberBatchYearMap).map(
	([key, value]) => ({
		key,
		value,
	}),
);

export const MemberPeriodMap = {
	1: "2020-2021",
	2: "2021-2022",
	3: "2022-2023",
	4: "2023-2024",
	5: "2024-2025",
} as const;

export const MemberPeriods = Object.entries(MemberPeriodMap).map(
	([key, value]) => ({
		key,
		value,
	}),
);

export const AgendaSetTypeMap = {
	1: "Teknik Industri",
	2: "Sistem Informasi",
	3: "Teknik Logistik",
} as const;

export const AgendaSetTypes = Object.entries(AgendaSetTypeMap).map(
	([key, value]) => ({
		key,
		value,
	}),
);

export const AgendaStatusMap = {
	1: "Proses",
	2: "Disetujui",
	3: "Ditolak",
} as const;

export const AgendaStatuses = Object.entries(AgendaStatusMap).map(
	([key, value]) => ({
		key,
		value,
	}),
);
