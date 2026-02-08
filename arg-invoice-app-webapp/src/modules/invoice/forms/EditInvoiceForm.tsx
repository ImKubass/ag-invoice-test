import { useQuery } from "@tanstack/react-query";
import { api } from "../../../api/api.js";
import { InvoiceForm } from "./InvoiceForm.js";
import type { InvoiceSchema } from "./invoice.schema.js";

export function EditInvoiceForm(props: {
	invoiceId: number;
	onSuccess: () => void;
	onCancel: () => void;
}) {
	const { data: { invoice } = {}, isPending } = useQuery(
		api.invoiceQueryOptions({ id: props.invoiceId }),
	);

	const { mutate: updateInvoice } = api.updateInvoiceMutation({
		onSuccess: () => props.onSuccess(),
	});

	const handleSuccessSubmit = (data: InvoiceSchema) => {
		updateInvoice({
			id: props.invoiceId,
			input: {
				customerCity: data.to.city,
				customerCountry: data.to.country,
				customerEmail: data.to.email,
				customerName: data.to.fullName,
				customerStreet: data.to.streetAddress,
				customerZip: data.to.postalCode,
				dueDate: data.paymentDate,
				issueDate: data.invoiceDate,
				items: data.items.map((item) => ({
					description: item.name,
					quantity: item.quantity,
					pricePerUnit: item.price * 100,
				})),
				projectDescription: data.projectDescription,
				vendorCity: data.from.city,
				vendorCountry: data.from.country,
				vendorStreet: data.from.streetAddress,
				vendorZip: data.from.postalCode,
			},
		});
	};

	if (isPending) {
		return <div>Loading...</div>;
	}

	if (!invoice) {
		return null;
	}

	return (
		<div>
			<InvoiceForm
				readOnly={{
					invoiceDate: true,
				}}
				defaultValues={{
					from: {
						streetAddress: invoice.vendorStreet,
						city: invoice.vendorCity,
						postalCode: invoice.vendorZip,
						country: invoice.vendorCountry,
					},
					to: {
						fullName: invoice.customerName,
						email: invoice.customerEmail,
						streetAddress: invoice.customerStreet,
						city: invoice.customerCity,
						postalCode: invoice.customerZip,
						country: invoice.customerCountry,
					},
					invoiceDate: invoice.issueDate.split("T")[0],
					paymentDate: invoice.dueDate.split("T")[0],
					projectDescription: invoice.projectDescription,
					items: invoice.items.map((item) => ({
						name: item.description,
						quantity: item.quantity,
						price: item.pricePerUnit / 100,
					})),
				}}
				onSuccessSubmit={handleSuccessSubmit}
				onCancel={props.onCancel}
			/>
		</div>
	);
}
