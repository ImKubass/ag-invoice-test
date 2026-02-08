import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { authStore } from "../../modules/auth/auth.js";

export const Route = createFileRoute("/_public")({
	component: AuthLayoutComponent,
	beforeLoad: async () => {
		// If the user is logged in, redirect to the app
		if (authStore.get()) {
			throw redirect({ to: "/app", replace: true });
		}
	},
});

function AuthLayoutComponent() {
	return (
		<div className="flex flex-col pt-36 px-6 md:h-dvh md:justify-center md:items-center md:pt-0">
			<img
				src="/assets/logo-top.svg"
				className={"w-18 md:w-24 absolute top-0 left-0 right-0 mx-auto"}
				alt=""
			/>
			<Outlet />
		</div>
	);
}
