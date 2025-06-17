import type { Config } from "ziggy-js";

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
	role: number;
	created_at: string;
	updated_at: string;
};
