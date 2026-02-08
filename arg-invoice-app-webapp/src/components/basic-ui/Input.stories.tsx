import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ComponentProps } from "react";
import { Input } from "./TextField.js";

type Props = ComponentProps<typeof Input>;

const meta = {
	component: Input,
} satisfies Meta<Props>;

export default meta;

export const Base = {
	args: {
		placeholder: "Placeholder",
		readOnly: false,
		disabled: false,
		error: false,
	} satisfies Props,
} satisfies StoryObj<Props>;

export const Extended = {
	args: {
		label: "Label",
		placeholder: "Placeholder",
		readOnly: false,
		disabled: false,
		error: false,
		message: "This is a static message.",
	} satisfies Props,
} satisfies StoryObj<Props>;

export const WithCustomMessage: StoryObj<Props> = {
	args: Base.args,
	render: (args) => (
		<Input {...args} message={() => <div>custom message</div>} />
	),
};

const DateStory: StoryObj<Props> = {
	args: Base.args,
	render: (args) => <Input {...args} type={"date"} />,
};
export { DateStory as Date };

export const Color: StoryObj<Props> = {
	args: Base.args,
	render: (args) => <Input {...args} type={"color"} />,
};
