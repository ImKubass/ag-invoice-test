import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta = {
	title: "Tokens Usage",
	parameters: {
		layout: "fullscreen",
	},
};

export default meta;

export const TokensUsage: StoryObj = {
	render: () => (
		<div className="min-h-screen flex bg-bg">
			{/* Sidebar */}
			<aside className="w-64 bg-inverted-bg-surface text-inverted-text-primary p-6">
				<h2 className="font-bold mb-6">Navigation</h2>
				<ul className="space-y-3 text-sm">
					<li>Dashboard</li>
					<li className="opacity-70">Invoices</li>
					<li className="opacity-70">Clients</li>
					<li className="opacity-70">Settings</li>
				</ul>
			</aside>

			{/* Content */}
			<main className="flex-1 p-8 space-y-8">
				<header>
					<h1 className="typo-heading-l">Invoices</h1>
					<p className="typo-body text-text-subtle">
						Overview of all billing documents
					</p>
				</header>

				{/* Card */}
				<section className="bg-bg-surface rounded-lg p-6 shadow-lg flex gap-6 items-center">
					<p className="typo-body text-text-subtle">Invoice status</p>

					<span className="px-4 py-1 rounded-full bg-state-success-bg text-state-success-text typo-heading-s">
						Paid
					</span>
					<span className="px-4 py-1 rounded-full bg-state-warning-bg text-state-warning-text typo-heading-s">
						Pending
					</span>
				</section>

				<section className="flex flex-wrap gap-2">
					<button
						type="button"
						className="inline-flex items-center px-5 py-3 rounded-full font-bold bg-action-primary-bg text-action-primary-text hover:bg-action-primary-hover-bg"
					>
						Create Invoice
					</button>

					<button
						type="button"
						className="inline-flex items-center px-5 py-3 rounded-full font-bold bg-action-secondary-bg text-action-secondary-text hover:bg-action-secondary-hover-bg"
					>
						Cancel
					</button>

					<button
						type="button"
						className="inline-flex items-center px-5 py-3 rounded-full font-bold bg-action-strong-bg text-action-strong-text hover:bg-action-strong-hover-bg"
					>
						Settings
					</button>

					<button
						type="button"
						className="inline-flex items-center px-5 py-3 rounded-full font-bold bg-action-danger-bg text-action-danger-text hover:bg-action-danger-hover-bg"
					>
						Delete Invoice
					</button>

					<button
						type={"button"}
						disabled
						className="inline-flex items-center px-5 py-3 rounded-full font-bold bg-action-disabled-bg text-action-disabled-text cursor-not-allowed"
					>
						Delete Invoice
					</button>
				</section>

				<section className="bg-bg-surface rounded-lg p-6 shadow-lg flex gap-6 items-center">
					<form>
						<div>
							<label
								htmlFor={"example-form--street-address"}
								className={"text-input-label typo-body"}
							>
								Street Address
							</label>
							<input
								id={"example-form--street-address"}
								className={
									"bg-input-bg border-input-border text-input-text p-4 border-2 rounded-sm hover:border-input-border-focus"
								}
								placeholder={"1234 Main St"}
							/>
						</div>

						<div>
							<label
								htmlFor={"example-form--error"}
								className={"text-input-error-text typo-body"}
							>
								Street Address - Error
							</label>
							<input
								id={"example-form--error"}
								className={
									"bg-input-bg border-input-border-error p-4 border-2 rounded-sm"
								}
							/>
							<div className={"text-input-error-text typo-body"}>
								Error message
							</div>
						</div>
					</form>
				</section>

				{/* Table */}
				<section className="bg-bg-surface p-6 shadow-lg gap-6 items-center rounded-lg">
					<div>
						<h2 className={"typo-heading-s"}>
							<span className={"text-text-subtle"}>#</span>XM9124
						</h2>
						<div className={"text-text-secondary"}>Graphic Design</div>
					</div>
					<div className={"overflow-hidden rounded-lg bg-bg-subtle"}>
						<table className="w-full">
							<thead className="text-text-secondary">
								<tr>
									<th className="p-4 text-left typo-body">Invoice</th>
									<th className="p-4 text-left typo-body">Client</th>
									<th className="p-4 text-left typo-body">Status</th>
								</tr>
							</thead>
							<tbody className={"typo-heading-s"}>
								<tr>
									<td className="p-4">#RT3080</td>
									<td className="p-4 text-text-secondary">Jensen Huang</td>
									<td className="p-4">
										<span className="px-3 py-1 rounded-full bg-state-warning-bg text-state-warning-text">
											Pending
										</span>
									</td>
								</tr>
							</tbody>
							<tfoot className="bg-inverted-bg-surface text-inverted-text-primary">
								<tr>
									<td className="p-4" colSpan={3}>
										Table footer
									</td>
								</tr>
							</tfoot>
						</table>
					</div>
				</section>
			</main>
		</div>
	),
};
