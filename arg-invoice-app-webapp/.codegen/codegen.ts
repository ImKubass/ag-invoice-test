import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
	overwrite: true,
	schema: ".codegen/schema.gen.json",
	documents: "./src/**/*.graphql",
	generates: {
		"src/api/sdk.gen.ts": {
			plugins: ["typescript", "typescript-operations", "typed-document-node"],
			config: {
				useTypeImports: true,
				scalars: {
					DateTime: "string",
				},
				// typed-document-node
				documentMode: "string",
			},
		},
	},
};

export default config;
