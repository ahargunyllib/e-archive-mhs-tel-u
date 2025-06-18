import type { Config } from "ziggy-js";
import type {
	AgendaSetTypeMap,
	AgendaStatusMap,
	MemberBatchYearMap,
	MemberDivisonMap,
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
	division: keyof typeof MemberDivisonMap;
	set_type: keyof typeof MemberSetTypeMap;
	batch_year: keyof typeof MemberBatchYearMap;
	period: keyof typeof MemberPeriodMap;
	ipk: number;
	tak: number;
	erpt_score: number;
	created_at: string;
	updated_at: string;
};

export type Agenda = {
	id: string;
	date: Date;
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
