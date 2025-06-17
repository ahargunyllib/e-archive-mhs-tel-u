import type { Config } from "ziggy-js";
import type { UserRoleMap } from "../lib/enums";

export interface Auth {
	user: User;
}

export type SharedData = {
	name: string;
	quote: { message: string; author: string };
	auth: Auth;
	ziggy: Config & { location: string };
	sidebarOpen: boolean;
	flash: {
		success?: string;
		error?: string;
	};
	[key: string]: unknown;
};

export type User = {
	id: string;
	name: string;
	username: string;
	email: string;
	photo_profile: string | null;
	role: keyof typeof UserRoleMap;
	created_at: string;
	updated_at: string;
};
