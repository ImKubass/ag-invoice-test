import type { Preview } from "@storybook/react-vite";
// @ts-expect-error: all .storybook files are checked by tsconfig.node.json. That's fine but not for CSS imports.
import "./style.css";

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
};

export default preview;
