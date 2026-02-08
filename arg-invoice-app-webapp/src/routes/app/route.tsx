import { useQueryClient } from "@tanstack/react-query";
import {
	createFileRoute,
	Link,
	Outlet,
	redirect,
	stripSearchParams,
	useNavigate,
	useSearch,
} from "@tanstack/react-router";
import { api } from "../../api/api.js";
import { AppLayoutDrawer, AppLayoutRoot } from "../../layouts/app-layout.js";
import { authStore } from "../../modules/auth/auth.js";
import { logout } from "../../modules/auth/logout.js";
import { CreateInvoiceForm } from "../../modules/invoice/forms/CreateInvoiceForm.js";
import { EditInvoiceForm } from "../../modules/invoice/forms/EditInvoiceForm.js";
import { RouteError } from "../../route.error.js";
import { SEARCH_PARAMS_CONFIG } from "../../search-params.js";

export const Route = createFileRoute("/app")({
	beforeLoad: async ({ context }) => {
		try {
			if (!authStore.get()) {
				throw new RouteError("Unauthorized", 403);
			}

			// If the user is logged in, verify the session is still valid
			await context.queryClient.fetchQuery({
				...api.meQueryOptions(),
				retry: false,
			});
		} catch (error) {
			console.error(error);

			logout(context.queryClient);

			throw redirect({ to: "/login" });
		}
	},
	validateSearch: SEARCH_PARAMS_CONFIG.app.schema,
	search: {
		middlewares: [stripSearchParams(SEARCH_PARAMS_CONFIG.app.defaultValues)],
	},
	component: AppLayoutComponent,
});

function AppLayoutComponent() {
	const queryClient = useQueryClient();

	return (
		<AppLayoutRoot
			sidebarSlot={<InvoiceActionResolver />}
			menuItems={[
				{
					id: "logout",
					render: (props) => (
						<Link
							{...props}
							to={"/"}
							title={"Logout"}
							onClick={() => logout(queryClient)}
						>
							⇤
						</Link>
					),
				},
			]}
		>
			<Outlet />
		</AppLayoutRoot>
	);
}

function InvoiceActionResolver() {
	const { action, invoiceId } = useSearch({ from: "/app" });
	const navigate = useNavigate();

	if (!action) {
		return null;
	}

	const close = () =>
		navigate({
			to: ".",
			search: (prev) => ({ ...prev, invoiceId: null, action: null }),
			replace: true,
		});

	if (action === "edit-invoice" && invoiceId) {
		return (
			<AppLayoutDrawer onClose={close}>
				<EditInvoiceForm
					invoiceId={invoiceId}
					onSuccess={close}
					onCancel={close}
				/>
			</AppLayoutDrawer>
		);
	}

	if (action === "create-invoice") {
		return (
			<AppLayoutDrawer onClose={close}>
				<CreateInvoiceForm onSuccess={close} onCancel={close} />
			</AppLayoutDrawer>
		);
	}

	return null;
}
