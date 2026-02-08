import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_public/")({
	loader: () => {
		throw redirect({
			to: "/login",
			replace: true,
		});
	},
});
