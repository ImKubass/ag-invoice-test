import type { QueryClient } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	HeadContent,
	Outlet,
} from "@tanstack/react-router";
import { getConfig } from "../utils/config";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
	{
		head: () => {
			const { appName } = getConfig();
			return {
				meta: [
					{
						title: appName,
					},
				],
			};
		},
		component: RootComponent,
	},
);

function RootComponent() {
	return (
		<>
			<HeadContent />
			<Outlet />
		</>
	);
}
