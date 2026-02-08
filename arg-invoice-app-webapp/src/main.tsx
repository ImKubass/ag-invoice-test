import { createRouter, RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import { ApiProvider, client } from "./api/ApiProvider.js";
import { routeTree } from "./routeTree.gen";

const router = createRouter({
	routeTree,
	context: {
		queryClient: client,
	},
	// Since we're using React Query, we don't want loader calls to ever be stale
	// This will ensure that the loader is always called when the route is preloaded or visited
	defaultPreloadStaleTime: 0,
	scrollRestoration: true,
});

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

const rootElement = document.getElementById("root") as HTMLElement;
if (!rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<StrictMode>
			<ApiProvider>
				<RouterProvider router={router} />
			</ApiProvider>
		</StrictMode>,
	);
}
