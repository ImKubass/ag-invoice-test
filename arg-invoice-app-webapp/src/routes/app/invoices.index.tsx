import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { api } from "../../api/api.js";
import { InvoiceStatus } from "../../api/sdk.gen.js";
import { RouterButton } from "../../components/app-ui/RouterButton.js";
import { Card } from "../../components/basic-ui/Card.js";
import {
	formatDate,
	formatPrice,
} from "../../components/basic-ui/utils/format.js";
import { AppLayoutContent } from "../../layouts/app-layout.js";
import { InvoiceFilter } from "../../modules/invoice/components/InvoiceFilter.js";
import { InvoiceStatus as InvoiceStatusChip } from "../../modules/invoice/components/InvoiceStatus.js";
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

	const {
		data: { invoices },
	} = useSuspenseQuery({
		...api.invoicesQueryOptions(),
	});

	const filteredInvoices = invoices.filter((invoice) => {
		if (status === "all") {
			return true;
		}
		return invoice.status === status;
	});

	console.log(filteredInvoices);

	return (
		<AppLayoutContent className={"flex flex-col gap-4"}>
			<div className="grid grid-cols-[1fr_auto_auto] gap-x-4 gap-y-1 items-center">
				<header>
					<h1 className="typo-heading-m md:typo-heading-l text-text-primary">
						Invoices
					</h1>
					<div className="text-text-secondary typo-body">
						There are {invoices.length} total invoices
					</div>
				</header>

				{invoices.length > 0 && <InvoiceFilter className={"row-span-2"} />}

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

			{filteredInvoices.length === 0 ? (
				<Card className="text-text-secondary text-center typo-body">
					No invoices found.
				</Card>
			) : (
				<div className="grid gap-4">
					{filteredInvoices.map((invoice) => (
						<Card
							key={invoice.id}
							as={Link}
							to="/app/invoices/$invoiceId"
							params={{ invoiceId: invoice.id }}
							className="grid gap-4 md:grid-cols-[auto_1fr_auto_auto] md:items-center"
						>
							<div className="typo-heading-s text-text-primary">
								<span className="text-text-subtle">#</span>
								{invoice.number}
							</div>
							<div className="text-text-secondary typo-body">
								Due {formatDate(invoice.dueDate)}
								<span className="block text-text-secondary">
									{invoice.customerName}
								</span>
							</div>
							<div className="typo-heading-s text-text-primary">
								{formatPrice(invoice.amount, invoice.currency)}
							</div>
							<InvoiceStatusChip
								status={
									invoice.status === InvoiceStatus.Paid ? "paid" : "pending"
								}
							/>
						</Card>
					))}
				</div>
			)}
		</AppLayoutContent>
	);
}
