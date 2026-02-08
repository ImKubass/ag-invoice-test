import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card } from "./Card.js";

const meta = {
	component: Card,
	args: {
		children: "This is a Card component",
	},
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	name: "Card",
};
