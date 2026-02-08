export const formatPrice = (price: number, currency: string) => {
	const formatter = new Intl.NumberFormat(undefined, {
		style: "currency",
		currency: currency.toUpperCase(),
	});

	const formatted = formatter
		.formatToParts(price / 100)
		.map((part, index) =>
			part.type === "currency" && index === 0 ? `${part.value} ` : part.value,
		)
		.join("");

	return formatted;
};

export const formatDate = (date: Date | string) => {
	const dateObj = date instanceof Date ? date : new Date(date);
	return dateObj.toLocaleDateString(undefined, { dateStyle: "medium" });
};
