import z from "zod";
import type { Currency, InvoiceStatus } from "../../../api/sdk.gen.js";

const addressSchema = z.object({
	streetAddress: z.string().min(1, "Street address is required"),
	city: z.string().min(1, "City is required"),
	postalCode: z.string().min(1, "Postal code is required"),
	country: z.string().min(1, "Country is required"),
});

export const invoiceSchema = z
	.object({
		from: addressSchema,
		to: addressSchema.extend({
			fullName: z.string().min(1, "Client name is required"),
			email: z.email("Invalid email address"),
		}),
		invoiceDate: z.string().min(1, "Invoice date is required"),
		paymentDate: z.string().min(1, "Payment date is required"),
		projectDescription: z.string().min(1, "Project description is required"),
		items: z
			.array(
				z.object({
					name: z.string().min(1, "Item name is required"),
					quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
					price: z.coerce.number().min(0, "Price must be positive"),
				}),
			)
			.min(1, "At least one item is required"),
	})
	.refine((data) => data.paymentDate >= data.invoiceDate, {
		message: "Payment date cannot be before invoice date",
		path: ["paymentDate"],
	});

export type InvoiceSchema = z.infer<typeof invoiceSchema>;

export type InvoicesSchema = {
	id: number;
	number: string;
	dueDate: string;
	customerName: string;
	amount: number;
	currency: Currency;
	status: InvoiceStatus;
};
