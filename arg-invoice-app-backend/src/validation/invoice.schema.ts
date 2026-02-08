import { z } from "zod";

const InvoiceItemInputSchema = z.object({
	quantity: z.number().positive("Quantity must be greater than 0"),
});

export const InvoiceInputSchema = z.object({
	items: z
		.array(InvoiceItemInputSchema)
		.min(1, "Items must contain at least 1 item"),
});
