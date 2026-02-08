import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
	stories: [
		{
			directory: "../src/components/basic-ui",
			files: "*.stories.tsx",
			titlePrefix: "Basic UI",
		},
		{
			directory: "../src/modules/invoice/components",
			files: "*.stories.tsx",
			titlePrefix: "Invoice module",
		},
	],
	addons: [],
	framework: "@storybook/react-vite",
};
export default config;
