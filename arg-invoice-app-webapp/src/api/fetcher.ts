import { authStore } from "../modules/auth/auth.js";
import { getConfig } from "../utils/config";
import {
	GraphQLError,
	ServerEmptyResponseError,
	ServerNotRespondingError,
} from "./errors";
import type { TypedDocumentString } from "./sdk.gen";

const { graphqlApiUrl } = getConfig();

export function fetcher<TData, TVariables>(
	query: string | TypedDocumentString<TData, TVariables>,
	variables?: TVariables,
) {
	return async (): Promise<TData> => {
		const authToken = authStore.get();

		const res = await fetch(graphqlApiUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/json;charset=UTF-8",
				...(authToken && { Authorization: `Bearer ${authToken}` }),
			},
			mode: "cors",
			body: JSON.stringify({ query, variables }),
		}).catch((error) => {
			// Handle network errors, which include server not responding
			throw new ServerNotRespondingError(error);
		});

		const json = await res.json();

		const error = json.errors || json.data?.errors;

		if (error) {
			throw new GraphQLError(
				error?.[0].message,
				error?.[0].extensions?.code,
				error?.[0].extensions?.error,
			);
		}

		if (json.data === undefined) {
			throw new ServerEmptyResponseError();
		}

		return json.data;
	};
}
