export function createInvoiceNumber(year: string, index: number) {
	return `${year}${index.toString().padStart(6, "0")}`;
}

export function incrementInvoiceNumber(number: string) {
	const year = number.slice(0, 4);
	return createInvoiceNumber(year, parseInt(number.slice(4), 10) + 1);
}
