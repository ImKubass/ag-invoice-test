import type { Meta, StoryObj } from "@storybook/react-vite";
import { InvoiceStatus } from "./InvoiceStatus";

const meta = {
	component: InvoiceStatus,
	args: {
		status: "paid",
	},
} satisfies Meta<typeof InvoiceStatus>;

export default meta;
type Story = StoryObj<typeof meta>;

const statuses = ["paid", "pending"] as const;

const Default: Story = {
	render: () => {
		return (
			<div className="flex flex-col gap-4 items-start">
				{statuses.map((status) => (
					<InvoiceStatus status={status} key={status} />
				))}
			</div>
		);
	},
};

export { Default as InvoiceStatus };
