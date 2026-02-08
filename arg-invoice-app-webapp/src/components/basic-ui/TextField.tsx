import clsx from "clsx";
import type { ComponentProps, ElementType, ReactNode } from "react";
import type { PolymorphicPropsWithRef } from "./utils/polymorphic.js";
import { useId } from "./utils/useId.js";

type TextFieldProps = {
	error?: boolean;
	label?: ReactNode;
	message?: string | (() => ReactNode);
	// e.g. for ref
	rootProps?: ComponentProps<"div">;
	// e.g. for className
	inputProps?: ComponentProps<"input">;
};

const defaultAs: ElementType = "input";

export const TextField = <El extends ElementType = typeof defaultAs>({
	as,
	error,
	label,
	message,

	className,
	rootProps,

	inputProps,
	...rest
}: PolymorphicPropsWithRef<El, TextFieldProps>) => {
	const id = useId(rest.id);
	const As = as || defaultAs;

	return (
		<div {...rootProps} className={clsx("ui-text-field", className)}>
			{label ? (
				<label
					htmlFor={id}
					className={clsx(
						"ui-text-field__label",
						error && "ui-text-field__label--error",
					)}
				>
					{label}
				</label>
			) : null}

			<As
				{...inputProps}
				{...rest}
				id={id}
				className={clsx(
					"ui-text-field__element",
					error && "ui-text-field__element--error",
					inputProps?.className,
				)}
			/>

			{typeof message === "function" ? (
				message()
			) : message ? (
				<span
					className={clsx(
						"ui-text-field__message",
						error && "ui-text-field__message--error",
					)}
				>
					{message}
				</span>
			) : null}
		</div>
	);
};

export const Input = (
	props: ComponentProps<typeof TextField<"input">> & { as?: never },
) => <TextField {...props} as={"input"} />;

export const TextArea = (
	props: ComponentProps<typeof TextField<"textarea">> & { as?: never },
) => <TextField {...props} as={"textarea"} />;

export const Select = (
	props: ComponentProps<typeof TextField<"select">> & { as?: never },
) => <TextField {...props} as={"select"} />;
