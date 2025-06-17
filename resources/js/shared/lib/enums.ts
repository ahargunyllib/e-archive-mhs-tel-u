export const UserRoleMap = {
	1: "Admin",
	2: "Mahasiswa",
	3: "Dosen",
} as const;

export const UserRoles = Object.entries(UserRoleMap).map(([key, value]) => ({
	key,
	value,
}));
