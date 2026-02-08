import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { api } from "../../api/api.js";
import { InvoiceStatus } from "../../api/sdk.gen.js";
import { RouterButton } from "../../components/app-ui/RouterButton.js";
import { Button } from "../../components/basic-ui/Button.js";
import { Card } from "../../components/basic-ui/Card.js";
import { Icon } from "../../components/basic-ui/Icon.js";
import {
	formatDate,
	formatPrice,
} from "../../components/basic-ui/utils/format.js";
import { AppLayoutContent } from "../../layouts/app-layout.js";
import { InvoiceStatus as InvoiceStatusComponent } from "../../modules/invoice/components/InvoiceStatus.js";
import { getConfig } from "../../utils/config.js";

export const Route = createFileRoute("/app/invoices/$invoiceId")({
	component: ViewInvoiceComponent,
	loader: async ({ context, params }) => {
		return await context.queryClient.fetchQuery(
			api.invoiceQueryOptions({ id: Number.parseInt(params.invoiceId, 10) }),
		);
	},
	head: (ctx) => {
		const { appName } = getConfig();
		const invoiceNumber = ctx.loaderData?.invoice.number;
		return {
			meta: [
				{
					title: invoiceNumber
						? `Invoice #${invoiceNumber} | ${appName}`
						: `Invoice | ${appName}`,
				},
			],
		};
	},
});

function ViewInvoiceComponent() {
	const params = Route.useParams();

	const invoiceId = Number.parseInt(params.invoiceId, 10);

	const navigate = useNavigate();

	const {
		data: { invoice },
	} = useSuspenseQuery({
		...api.invoiceQueryOptions({ id: invoiceId }),
		select: (data) => ({
			invoice: {
				...data.invoice,
				items: data.invoice.items.map((item) => ({
					...item,
					totalPrice: item.quantity * item.pricePerUnit,
				})),
				totalPrice: data.invoice.items.reduce(
					(acc, item) => acc + item.quantity * item.pricePerUnit,
					0,
				),
			},
		}),
	});

	const { mutate: deleteInvoice } = api.deleteInvoiceMutation({
		onSuccess: () => {
			navigate({ to: "/app/invoices" });
		},
	});

	const handleDelete = () => {
		const isConfirmed = window.confirm(
			`Are you sure you want to delete invoice #${invoice.number}? This action cannot be undone.`,
		);

		if (!isConfirmed) return;

		deleteInvoice({ id: invoiceId });
	};

	const { mutate: togglePaidStatus } = api.markInvoiceAsPaidMutation();
	const handleTogglePaidStatus =
		(input: { id: number; isPaid: boolean }) => () => {
			togglePaidStatus({
				id: input.id,
				paid: input.isPaid,
			});
		};

	return (
		<AppLayoutContent>
			<h1 className={"sr-only"}>Invoice Detail ({invoice.number})</h1>

			<Link
				to={".."}
				activeOptions={{ exact: true }}
				className={"inline-flex items-center typo-heading-s gap-4"}
			>
				<Icon
					icon={"chevron-left"}
					className={"-mt-font-family-correction"}
					isPresentation
				/>
				Go Back
			</Link>

			<Card
				className={"flex flex-wrap justify-between gap-6 items-center mt-8"}
			>
				<div
					className={
						"typo-body text-text-subtle flex items-center justify-between grow gap-4 sm:grow-0"
					}
				>
					Status: <InvoiceStatusComponent status={invoice.status} />
				</div>

				<div className={"flex flex-wrap gap-2 items-center"}>
					<RouterButton
						variant={"secondary"}
						to={"."}
						search={(prev) => ({
							...prev,
							action: "edit-invoice",
							invoiceId: invoiceId,
						})}
					>
						Edit
					</RouterButton>
					<Button variant={"danger"} type={"button"} onClick={handleDelete}>
						Delete
					</Button>
					<Button
						variant={"primary"}
						type={"button"}
						onClick={handleTogglePaidStatus({
							id: invoiceId,
							isPaid: invoice.status !== InvoiceStatus.Paid,
						})}
					>
						{invoice.status === InvoiceStatus.Paid
							? "Mark as Unpaid"
							: "Mark as Paid"}
					</Button>
				</div>
			</Card>

			<Card className={"mt-4"}>
				<h2 className={"typo-heading-s"}>
					<span className={"text-text-subtle"}>#</span>
					{invoice.number}
				</h2>
				<div className={"flex flex-col gap-7"}>
					<div className={"typo-body text-text-secondary"}>
						{invoice.projectDescription}
					</div>

					<div className={"typo-body text-text-secondary"}>
						{invoice.vendorStreet}
						<br />
						{invoice.vendorCity}
						<br />
						{invoice.vendorZip}
						<br />
						{invoice.vendorCountry}
					</div>

					<div className={"grid grid-rows-2 gap-inherit grid-flow-col"}>
						<div>
							<div className={"typo-body text-text-secondary"}>
								Invoice Date
							</div>
							<div className={"typo-heading-s"}>
								{formatDate(invoice.issueDate)}
							</div>
						</div>

						<div>
							<div className={"typo-body text-text-secondary"}>Payment Due</div>
							<div className={"typo-heading-s"}>
								{formatDate(invoice.dueDate)}
							</div>
						</div>

						<div className={"row-span-full"}>
							<div className={"typo-body text-text-secondary"}>Bill To</div>
							<div className={"typo-heading-s"}>
								<div className={"typo-heading-s"}>{invoice.customerName}</div>
								<div className={"typo-body text-text-secondary"}>
									{invoice.customerStreet}
									<br />
									{invoice.customerCity}
									<br />
									{invoice.customerZip}
									<br />
									{invoice.customerCountry}
								</div>
							</div>
						</div>
					</div>

					<div>
						<div className={"typo-body text-text-secondary"}>Sent to</div>
						<div className={"typo-heading-s"}>{invoice.customerEmail}</div>
					</div>

					<div className={"overflow-x-auto rounded-lg bg-bg-subtle"}>
						<table className="w-full">
							<thead className="text-text-secondary">
								<tr>
									<th className="p-6 text-left typo-body">Item Name</th>
									<th className="p-6 typo-body text-right">QTY.</th>
									<th className="p-6 typo-body text-right">Price</th>
									<th className="p-6 typo-body text-right">Total</th>
								</tr>
							</thead>
							<tbody className={"typo-heading-s"}>
								{invoice.items.map((item) => (
									<tr key={item.id}>
										<td className="p-6">{item.description}</td>
										<td className="p-6 text-text-secondary text-right">
											{item.quantity}
										</td>
										<td className="p-6 text-text-secondary text-right whitespace-nowrap">
											{formatPrice(item.pricePerUnit, invoice.currency)}
										</td>
										<td className="p-6 text-right whitespace-nowrap">
											{formatPrice(item.totalPrice, invoice.currency)}
										</td>
									</tr>
								))}
							</tbody>
							<tfoot className="bg-inverted-bg-surface text-inverted-text-primary">
								<tr>
									<td className="p-6" colSpan={4}>
										<div className={"flex items-center justify-between gap-2"}>
											<span className={"typo-body"}>Grand Total</span>
											<span className="whitespace-nowrap typo-heading-m">
												{formatPrice(invoice.totalPrice, invoice.currency)}
											</span>
										</div>
									</td>
								</tr>
							</tfoot>
						</table>
					</div>
				</div>
			</Card>
		</AppLayoutContent>
	);
}
