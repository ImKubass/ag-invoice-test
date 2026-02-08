import {
	MutationCache,
	QueryCache,
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query";
import type { ReactNode } from "react";

export const handleGlobalError = (error: unknown) => {
	console.error(error);
};

export const client: QueryClient = new QueryClient({
	mutationCache: new MutationCache({
		onError: async (error, _query, _context) => {
			handleGlobalError(error);
		},
	}),
	queryCache: new QueryCache({
		onError: async (error) => {
			handleGlobalError(error);
		},
	}),
	defaultOptions: {
		queries: {
			staleTime: 5 * 60 * 1000, // 5 minutes
			retry: false,
		},
	},
});

type ApiProviderProps = {
	children: ReactNode;
};

export const ApiProvider = ({ children }: ApiProviderProps) => {
	return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};
