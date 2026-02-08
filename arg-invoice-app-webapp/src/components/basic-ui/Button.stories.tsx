import type { Meta, StoryFn, StoryObj } from "@storybook/react-vite";
import type { ComponentProps } from "react";
import { Button } from "./Button.js";

type Props = ComponentProps<typeof Button>;

const meta = {
	component: Button,
	args: {
		variant: "primary",
		disabled: false,
		children: "Button Content",
	},
	argTypes: {
		onClick: { action: "clicked" },
	},
} satisfies Meta<typeof Button>;

export default meta;

type StoryObject = StoryObj<typeof Button>;

export const Base: StoryObject = {};

export const Overview: StoryFn<Props> = ({
	children,
	iconStart = "plus-circle",
	iconEnd = "trash",
	disabled,
	...rest
}: Props) => {
	return (
		<div className={"flex flex-col gap-8"}>
			{Button.variants.map((variant) => {
				const sharedProps = { ...rest, variant };
				return (
					<div key={variant} className={"flex flex-col items-start gap-2"}>
						<div>variant: {variant}</div>
						<div className={"flex flex-wrap gap-x-4"}>
							<div key={variant} className={"flex flex-col items-start gap-2"}>
								<Button {...sharedProps}>{children}</Button>
								<Button {...sharedProps} iconEnd={iconEnd}>
									{children}
								</Button>
								<Button {...sharedProps} iconStart={iconStart}>
									{children}
								</Button>
								<Button {...sharedProps} iconStart={iconStart}>
									This is an example of a longer button text. This is an example
									of a longer button text.
								</Button>
								<Button
									{...sharedProps}
									iconStart={iconStart}
									iconEnd={iconEnd}
								>
									{children}
								</Button>
								<Button
									{...sharedProps}
									iconStart={iconStart}
									iconEnd={iconEnd}
								>
									{children}
								</Button>
								<Button {...sharedProps} iconStart={iconStart} />
								<Button {...sharedProps} isBusy={true}>
									{children}
								</Button>
								<Button {...sharedProps} disabled={true}>
									{children}
								</Button>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
};
