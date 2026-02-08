import type { QueryClient } from "@tanstack/react-query";
import { authStore } from "./auth";

export const logout = (queryClient: QueryClient) => {
	authStore.clear();
	queryClient.clear();
};
