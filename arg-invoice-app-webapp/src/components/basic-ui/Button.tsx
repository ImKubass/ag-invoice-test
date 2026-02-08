import clsx from "clsx";
import { Children, type ElementType } from "react";
import { Icon, type IconType } from "./Icon.js";
import type { PolymorphicPropsWithRef } from "./utils/polymorphic.js";

type Variant = "primary" | "secondary" | "tertiary" | "danger";

const variantToClassNameMap: Record<Variant, string> = {
	primary: "ui-button--primary",
	secondary: "ui-button--secondary",
	tertiary: "ui-button--tertiary",
	danger: "ui-button--danger",
};

type Props = {
	/* allow disabled property for the elements that doesn't have the property natively */
	disabled?: boolean;
	variant: Variant;
	iconStart?: IconType;
	iconEnd?: IconType;
	isBusy?: boolean; // TODO: implement spinner when isBusy is true
};

const defaultAs: ElementType = "button";

export const Button = <El extends ElementType = typeof defaultAs>({
	as,

	variant,
	iconStart,
	iconEnd,
	disabled,
	children,
	className,
	isBusy,
	...rest
}: PolymorphicPropsWithRef<El, Props> & Props) => {
	const As = as || defaultAs;

	const hasChildren = Children.count(children) > 0;
	const isSquare = !hasChildren && (!iconStart || !iconEnd);

	return (
		<As
			{...rest}
			className={clsx(
				"ui-button",
				variantToClassNameMap[variant],
				isSquare && "ui-button--is-square",
				className,
			)}
			aria-busy={isBusy ?? undefined}
			{...(disabled
				? As === "button"
					? { disabled }
					: { "aria-disabled": disabled }
				: {})}
		>
			{iconStart ? <Icon icon={iconStart} isPresentation /> : null}
			{hasChildren ? <span>{children}</span> : null}
			{iconEnd ? <Icon icon={iconEnd} isPresentation /> : null}
		</As>
	);
};

Button.displayName = "Button";
Button.variants = [
	"primary",
	"secondary",
	"tertiary",
	"danger",
] as const satisfies Variant[];
