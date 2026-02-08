import clsx from "clsx";
import type { JSX } from "react";
import type { icons } from "./icon-sprite-ids.generated.js";
import { iconSpriteMeta } from "./icon-sprite-meta.generated.js";
import type { A11ySvg } from "./utils/a11ySvg.js";

type IconType = keyof typeof icons;
type IconProps = Omit<JSX.IntrinsicElements["svg"], "role" | "children"> & {
	icon: IconType;
} & A11ySvg;

const DEFAULT_SIZE = "1em";

/**
 * Icons are colored by stroke.
 * Stroke color is set to "currentColor".
 * Sometimes you want to fill icon (heart or star, for example). Use tailwindcss class "fill-current".
 */
const Icon = ({
	icon,
	width = DEFAULT_SIZE,
	height = DEFAULT_SIZE,
	title,
	isPresentation,
	...rest
}: IconProps) => (
	<svg
		{...rest}
		width={width}
		height={height}
		className={clsx(iconSpriteMeta.className, rest.className)}
		role={isPresentation ? "presentation" : undefined}
	>
		{title ? <title>{title}</title> : null}
		<use
			href={`/assets/${iconSpriteMeta.spriteFileName}?v=${iconSpriteMeta.hash}#${icon}`}
		/>
	</svg>
);

Icon.displayName = "Icon";

export { Icon };
export type { IconType };
