import { createFileRoute, Link } from "@tanstack/react-router";
import { RouterButton } from "../../components/app-ui/RouterButton.js";
import { AppLayoutContent } from "../../layouts/app-layout.js";
import { InvoiceFilter } from "../../modules/invoice/components/InvoiceFilter.js";
import { getConfig } from "../../utils/config.js";

export const Route = createFileRoute("/app/invoices/")({
	component: ViewInvoiceComponent,
	head: () => {
		const { appName } = getConfig();
		return {
			meta: [{ title: `Invoices | ${appName}` }],
		};
	},
});

function ViewInvoiceComponent() {
	const { status } = Route.useSearch();

	return (
		<AppLayoutContent className={"flex flex-col gap-4"}>
			<div className="grid grid-cols-[1fr_auto_auto] gap-x-4 gap-y-1 items-center">
				<h1 className="typo-heading-m md:typo-heading-l text-text-primary">
					Invoices
				</h1>

				<InvoiceFilter className={"row-span-2"} />

				<RouterButton
					variant={"primary"}
					iconStart={"plus-circle"}
					to={"."}
					search={(prev) => ({ ...prev, action: "create-invoice" })}
					className="row-span-2 whitespace-nowrap"
				>
					New<span className={"sr-only sm:not-sr-only"}>&nbsp;Invoice</span>
				</RouterButton>
			</div>

			{/* TODO: implement */}
		</AppLayoutContent>
	);
}
