import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ComponentProps } from "react";
import { TextArea } from "./TextField.js";

type Props = ComponentProps<typeof TextArea>;

const meta: Meta<Props> = {
	component: TextArea,
};

export default meta;

export const Base = {
	name: "TextArea",
	args: {
		label: "Label",
		placeholder: "Placeholder",
		readOnly: false,
		disabled: false,
		rows: 4,
		message: "This is a static message.",
	} satisfies Props,
} satisfies StoryObj<Props>;
