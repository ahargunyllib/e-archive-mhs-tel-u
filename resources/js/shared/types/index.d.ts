import type { Config } from "ziggy-js";
import type {
	AchievementSetTypeMap,
	AchievementTypeMap,
	AgendaSetTypeMap,
	AgendaStatusMap,
	MemberBatchYearMap,
	MemberPeriodMap,
	MemberSetTypeMap,
	UserRoleMap,
} from "../lib/enums";

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

export type Member = {
	id: string;
	name: string;
	address: string;
	contact: string;
	division: string;
	set_type: keyof typeof MemberSetTypeMap;
	batch_year: keyof typeof MemberBatchYearMap;
	period: keyof typeof MemberPeriodMap;
	photo_profile: string | null;
	created_at: string;
	updated_at: string;
};

export type Agenda = {
	id: string;
	date: string;
	name: string;
	work_program: string;
	set_type: keyof typeof AgendaSetTypeMap;
	description: string;
	relationship: string;
	estimated_cost: number;
	proposal: string;
	report: string;
	status: keyof typeof AgendaStatusMap;
	created_at: string;
	updated_at: string;
};

export type Achievement = {
	id: string;
	date: string;
	name: string;
	type: keyof typeof AchievementTypeMap;
	set_type: keyof typeof AchievementSetTypeMap;
	certificate: string;
	achiever: string;
	member: string | null;
	created_at: string;
	updated_at: string;
};
