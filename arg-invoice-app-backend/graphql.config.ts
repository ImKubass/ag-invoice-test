import dotenv from "dotenv";

dotenv.config({ path: [".env"] });

export default {
	projects: {
		public: {
			schema: "./src/schema.gql",
			documents: "src/graphql/**/*.graphql",
			extensions: {
				endpoints: {
					default: {
						url: `http://localhost:${process.env.APP_PORT}/graphql`,
						headers: {
							Authorization: `Dev ${process.env.DEV_API_TOKEN}`,
						},
					},
				},
			},
		},
	},
};
