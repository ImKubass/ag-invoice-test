import z from "zod";

const INVOICE_DEFAULT = {
	action: null,
	invoiceId: null,
	status: "all" as const,
};

const INVOICE_SCHEMA = z.object({
	action: z
		.literal(["create-invoice", "edit-invoice"])
		.nullish()
		.default(INVOICE_DEFAULT.action)
		.catch(INVOICE_DEFAULT.action),
	invoiceId: z
		.number()
		.positive()
		.nullish()
		.default(INVOICE_DEFAULT.invoiceId)
		.catch(INVOICE_DEFAULT.invoiceId),
	status: z
		.literal(["pending", "paid", "all"])
		.default(INVOICE_DEFAULT.status)
		.catch(INVOICE_DEFAULT.status),
});

export const SEARCH_PARAMS_CONFIG = {
	app: {
		defaultValues: INVOICE_DEFAULT,
		schema: INVOICE_SCHEMA,
	},
};
