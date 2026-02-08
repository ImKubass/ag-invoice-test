import clsx from "clsx";
import type { ElementType } from "react";
import type { PolymorphicPropsWithRef } from "./utils/polymorphic.js";

const defaultAs: ElementType = "div";

export const Card = <El extends ElementType = typeof defaultAs>({
	as,
	...rest
}: PolymorphicPropsWithRef<El>) => {
	const As = as || defaultAs;

	return (
		<As
			{...rest}
			className={clsx(
				rest.className,
				"bg-bg-surface rounded-lg p-6 shadow-lg border border-transparent",
			)}
		/>
	);
};
