import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ComponentProps } from "react";
import { Select } from "./TextField.js";

type Props = ComponentProps<typeof Select>;

const meta: Meta<Props> = {
	component: Select,
};

export default meta;

export const Base = {
	name: "Select",
	args: {
		label: "Label",
		children: (
			<>
				<option>
					Very long optionVery long optionVery long optionVery long optionVery
					long option
				</option>
				<option>Option 2</option>
				<option>Option 3</option>
				<option>Option 4</option>
			</>
		),
		disabled: false,
		message: "This is a static message.",
	} satisfies Props,
} satisfies StoryObj<Props>;
