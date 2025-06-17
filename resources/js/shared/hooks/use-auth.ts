import { usePage } from "@inertiajs/react";
import type { SharedData } from "../types";

export const useAuth = () => {
	const { props } = usePage<SharedData>();
	const { auth } = props;

	return {
		user: auth.user,
		isAuthenticated: !!auth.user,
	};
};
