import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
	title: "Typography",
} satisfies Meta;

export default meta;

const headlines = [
	"typo-heading-l",
	"typo-heading-m",
	"typo-heading-s",
	"typo-heading-s--var",
];

const body = ["typo-body", "typo-body--var"];

const groups = [
	{ title: "Headlines", items: headlines },
	{ title: "Body", items: body },
];

export const Typography: StoryObj = {
	render: () => {
		return (
			<div className={"flex flex-col gap-10"}>
				{groups.map((group) => (
					<div key={group.title} className={"flex flex-col items-start gap-1"}>
						<h4 className="text-2xl">{group.title}</h4>
						<div className={"flex flex-wrap gap-4"}>
							{group.items.map((className) => (
								<div key={className} className={"flex flex-col gap-1"}>
									<div>{className}</div>
									<div className={className}>
										Second
										<br />
										Row
									</div>
								</div>
							))}
						</div>
					</div>
				))}
			</div>
		);
	},
};
