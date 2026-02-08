import type { CodegenConfig } from "@graphql-codegen/cli";
import { loadEnv } from "vite";

const env = loadEnv(process.env.NODE_ENV || "development", process.cwd(), "");

const config: CodegenConfig = {
	overwrite: true,
	schema: env.VITE_GRAPHQL_API_URL,

	generates: {
		"./.codegen/schema.gen.json": {
			plugins: ["introspection"],
		},
	},
};

export default config;
