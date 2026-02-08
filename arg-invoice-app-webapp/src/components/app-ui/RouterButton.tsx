import { createLink, type LinkComponent } from "@tanstack/react-router";
import type { ComponentPropsWithoutRef } from "react";
import { Button } from "../basic-ui/Button";

type ButtonProps = ComponentPropsWithoutRef<typeof Button<"a">>;
const BasicButton = (props: ButtonProps) => <Button as={"a"} {...props} />;
const CreatedButtonComponent = createLink(BasicButton);

/**
 * A button component that works with TanStack Router for navigation.
 * More info at: https://tanstack.com/router/latest/docs/framework/react/guide/custom-link
 */
export const RouterButton: LinkComponent<typeof BasicButton> = (props) => {
	return <CreatedButtonComponent {...props} />;
};
