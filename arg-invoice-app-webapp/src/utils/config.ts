export function getConfig() {
	const graphqlApiUrl = import.meta.env.VITE_GRAPHQL_API_URL;

	// TODO: improve validations
	if (!graphqlApiUrl) {
		const message = "VITE_GRAPHQL_API_URL is not defined";
		throw new Error(message);
	}

	return {
		appName: "Invoice App",
		graphqlApiUrl,
	};
}
