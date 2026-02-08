import type { Meta, StoryFn } from "@storybook/react-vite";
import type { ComponentProps } from "react";
import { Extended as InputStory } from "./Input.stories.js";
import { Base as SelectStory } from "./Select.stories.js";
import { Base as TextAreaStory } from "./TextArea.stories.js";
import { Input, Select, TextArea, TextField } from "./TextField.js";

const meta = {
	component: TextField,
	args: {
		label: InputStory.args.label,
		readOnly: InputStory.args.readOnly,
		disabled: InputStory.args.disabled,
		error: InputStory.args.error,
		placeholder: InputStory.args.placeholder,
		required: false,
	} satisfies ComponentProps<typeof TextField>,
} satisfies Meta;

export default meta;

export const Overview: StoryFn<(typeof meta)["args"]> = (_props) => {
	return (
		<div className={"flex flex-col gap-8"}>
			{[false, true].map((disabled) => {
				return (
					<div key={`${disabled}`} className={"flex flex-col gap-2"}>
						<h4 className="text-2xl">{disabled ? "Disabled" : null}</h4>
						<div className={"flex flex-co gap-4"}>
							{[false, true].map((error) => {
								const props = { ..._props, error, disabled };
								return (
									<div
										key={`${disabled}${error}`}
										className={"flex flex-col gap-4"}
									>
										<Input {...InputStory.args} {...props} />
										<TextArea {...TextAreaStory.args} {...props} />
										<Select {...SelectStory.args} {...props} />
									</div>
								);
							})}
						</div>
					</div>
				);
			})}
		</div>
	);
};
