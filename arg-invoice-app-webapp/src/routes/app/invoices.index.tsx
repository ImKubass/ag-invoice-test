import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import type { ChangeEvent } from "react";
import { api } from "../../api/api.js";
import { InvoiceStatus } from "../../api/sdk.gen.js";
import { RouterButton } from "../../components/app-ui/RouterButton.js";
import { Card } from "../../components/basic-ui/Card.js";
import { Select } from "../../components/basic-ui/TextField.js";
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
	const { status, page, pageSize } = Route.useSearch();
	const navigate = useNavigate();

	const {
		data: { invoices },
	} = useSuspenseQuery({
		...api.invoicesQueryOptions({
			status:
				status === "all"
					? undefined
					: status === "paid"
						? InvoiceStatus.Paid
						: InvoiceStatus.Pending,
			page,
			pageSize,
		}),
	});

	const totalPages = Math.max(
		1,
		Math.ceil(invoices.total / invoices.pageSize),
	);
	const canGoPrev = page > 1;
	const canGoNext = page < totalPages;
	const handlePageSizeChange = (event: ChangeEvent<HTMLSelectElement>) => {
		const nextPageSize = Number(event.target.value);
		navigate({
			to: ".",
			search: (prev) => ({ ...prev, pageSize: nextPageSize, page: 1 }),
		});
	};


	return (
		<AppLayoutContent className={"flex flex-col gap-4"}>
			<div className="grid grid-cols-[1fr_auto_auto] gap-x-4 gap-y-1 items-center">
				<header>
					<h1 className="typo-heading-m md:typo-heading-l text-text-primary">
						Invoices
					</h1>
					<div className="text-text-secondary typo-body">
						There are {invoices.total} total invoices
					</div>
				</header>

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

			{invoices.data.length === 0 ? (
				<Card className="text-text-secondary text-center typo-body">
					No invoices found.
				</Card>
			) : (
				<div className="grid gap-4">
					{invoices.data.map((invoice) => (
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

			{invoices.total > 0 && (
				<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
					<div className="text-text-secondary typo-body">
						Page {page} of {totalPages}
					</div>
					<div className="flex flex-wrap items-center gap-2">
						<div className="flex items-center gap-2 text-text-secondary typo-body">
							<span>Per page</span>
							<Select
								value={pageSize}
								onChange={handlePageSizeChange}
								className="w-24"
							>
								<option value={2}>2</option>
								<option value={10}>10</option>
								<option value={20}>20</option>
								<option value={50}>50</option>
								<option value={100}>100</option>
							</Select>
						</div>
						<RouterButton
							variant={"tertiary"}
							disabled={!canGoPrev}
							to="."
							search={(prev) => ({
								...prev,
								page: Math.max(1, prev.page - 1),
							})}
						>
							Previous
						</RouterButton>
						<RouterButton
							variant={"tertiary"}
							disabled={!canGoNext}
							to="."
							search={(prev) => ({
								...prev,
								page: Math.min(totalPages, prev.page + 1),
							})}
						>
							Next
						</RouterButton>
					</div>
				</div>
			)}
		</AppLayoutContent>
	);
}
