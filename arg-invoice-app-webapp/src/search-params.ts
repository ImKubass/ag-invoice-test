import z from "zod";

const INVOICE_DEFAULT = {
	action: null,
	invoiceId: null,
	status: "all" as const,
	page: 1,
	pageSize: 20,
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
	page: z
		.number()
		.int()
		.positive()
		.default(INVOICE_DEFAULT.page)
		.catch(INVOICE_DEFAULT.page),
	pageSize: z
		.number()
		.int()
		.positive()
		.default(INVOICE_DEFAULT.pageSize)
		.catch(INVOICE_DEFAULT.pageSize),
});

export const SEARCH_PARAMS_CONFIG = {
	app: {
		defaultValues: INVOICE_DEFAULT,
		schema: INVOICE_SCHEMA,
	},
};
