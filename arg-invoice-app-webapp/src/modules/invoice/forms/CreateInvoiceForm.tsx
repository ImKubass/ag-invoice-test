import { api } from "../../../api/api.js";
import { InvoiceForm } from "./InvoiceForm.js";
import type { InvoiceSchema } from "./invoice.schema.js";

export function CreateInvoiceForm(props: {
	onSuccess: () => void;
	onCancel: () => void;
}) {
	const { mutate: createInvoice } = api.createInvoiceMutation({
		onSuccess: () => props.onSuccess(),
	});

	const handleSuccessSubmit = (data: InvoiceSchema) => {
		createInvoice({
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

	return (
		<div>
			<InvoiceForm
				defaultValues={{
					invoiceDate: new Date().toISOString().split("T")[0],
				}}
				onSuccessSubmit={handleSuccessSubmit}
				onCancel={props.onCancel}
			/>
		</div>
	);
}
