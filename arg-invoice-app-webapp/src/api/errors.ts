export class GraphQLError extends Error {
	public code?: string;
	public error?: string;

	constructor(
		message = "Unexpected GraphQL error",
		code?: string,
		error?: string,
	) {
		super(message);
		this.code = code;
		this.error = error;
	}
}

/**
 * Custom error for server non-response situations
 */
export class ServerNotRespondingError extends Error {
	public error?: unknown;
	constructor(error?: unknown) {
		super("Server is not responding");
		this.error = error;
	}
}

export class ServerEmptyResponseError extends Error {
	constructor() {
		super("No data returned from server.");
	}
}
