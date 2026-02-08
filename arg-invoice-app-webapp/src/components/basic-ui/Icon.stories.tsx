import type { StoryFn } from "@storybook/react-vite";
import clsx from "clsx";
import { type ComponentProps, type JSX, useState } from "react";
import { Icon, type IconType } from "./Icon.js";
import { icons } from "./icon-sprite-ids.generated.js";

const iconsKeys = Object.keys(icons) as IconType[];
type Props = ComponentProps<typeof Icon>;

const mapVisualOptionToRealClassName = {
	textRed: "text-[red]",
	text2rem: "text-[2rem]",
};

const meta = {
	component: Icon,
	args: {
		icon: "calendar",
		isPresentation: true,
	} satisfies Props,
	argTypes: {
		visualOption: {
			options: Object.keys(mapVisualOptionToRealClassName),
			control: { type: "inline-check" },
		},
	},
};

export default meta;

export const IconsList: StoryFn<
	Props & { visualOption?: (keyof typeof mapVisualOptionToRealClassName)[] }
> = ({ visualOption, ...props }) => {
	const [searchValue, setSearchValue] = useState("");

	const handleChange: JSX.IntrinsicElements["input"]["onChange"] = (event) => {
		setSearchValue(event.currentTarget.value.trim());
	};

	const countOfAllIcons = iconsKeys.length;
	const countOfFilteredIcons = iconsKeys.filter((iconKey) =>
		iconKey.includes(searchValue),
	).length;

	return (
		<>
			<label className="sticky top-[0] z-[1] flex items-center gap-[1rem] border-b-[1px] border-b-[lightgrey] p-[1rem] backdrop-blur-[10px]">
				<div>Search:</div>
				<input
					type={"search"}
					className="grow rounded-sm border border-[1px] border-[lightgrey] bg-[white] px-[0.5rem] py-[0.25rem]"
					onChange={handleChange}
				/>
				<div className={"text-[0.8em]"}>
					Visible:{" "}
					<b className={"inline-block w-[3ch] text-right"}>
						{countOfFilteredIcons}
					</b>{" "}
					of {countOfAllIcons}
				</div>
			</label>

			<div className="grid-dynamic-cols-[8rem] grid items-start gap-x-[0.5rem] gap-y-[1.5rem] pt-[1.5rem]">
				{iconsKeys.map((icon) => (
					<div
						key={icon}
						className={clsx(
							"flex flex-col items-center justify-center gap-[0.25rem]",
							icon.includes(searchValue) ? "opacity-100" : "opacity-10",
						)}
					>
						<Icon
							{...props}
							className={clsx(
								visualOption?.map((o) => mapVisualOptionToRealClassName[o]),
								props.className,
							)}
							icon={icon}
						/>
						<div className={"select-all text-center"}>{icon}</div>
					</div>
				))}
			</div>
		</>
	);
};
IconsList.argTypes = {
	icon: { table: { disable: true } },
};

IconsList.storyName = "Icon";
