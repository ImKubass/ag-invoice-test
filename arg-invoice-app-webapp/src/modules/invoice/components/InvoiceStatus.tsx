import clsx from "clsx";

type Status = "paid" | "pending";

type StatusObj = {
	className: string;
	content: React.ReactNode;
};

const statuses: Record<Status, StatusObj> = {
	paid: {
		className: "invoice-status--paid",
		content: "Paid",
	},
	pending: {
		className: "invoice-status--pending",
		content: "Pending",
	},
};

interface InvoiceStatusProps {
	status: Status;
	className?: string;
}

export const InvoiceStatus = (props: InvoiceStatusProps) => {
	const statusObj = statuses[props.status];

	return (
		<span
			className={clsx("invoice-status", statusObj.className, props.className)}
		>
			<div className="invoice-status__dot"></div>
			{statusObj.content}
		</span>
	);
};
