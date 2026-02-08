import clsx from "clsx";
import { type ComponentProps, Fragment, useEffect, useRef } from "react";

export function AppLayoutRoot(props: {
	children: React.ReactNode;
	sidebarSlot: React.ReactNode;
	menuItems: {
		id: string;
		render: (props: { className: string }) => React.ReactNode;
	}[];
}) {
	return (
		<div className={"flex flex-col md:flex-row min-h-dvh"}>
			{/* Primary Sidebar */}
			<aside
				className={clsx(
					"sticky top-0 h-app-layout-sidebar-size",
					"md:h-dvh md:w-app-layout-sidebar-size",

					"z-app-layout-sidebar",

					"flex items-center justify-between",
					"md:flex-col md:items-start",

					"bg-inverted-bg-surface text-inverted-text-primary ",
					"md:rounded-r-xl",
				)}
			>
				<img
					src="/assets/logo-left.svg"
					className={"h-full w-auto md:h-auto md:w-full"}
					alt=""
				/>

				<div
					className={clsx(
						"divide-inverted-bg-subtle divide-x",
						"md:divide-x-0 md:divide-y",
					)}
				>
					{props.menuItems.map((item) => (
						<Fragment key={item.id}>
							{item.render({
								className:
									"h-app-layout-sidebar-size w-app-layout-sidebar-size overflow-hidden p-5 inline-flex items-center text-inverted-text-secondary",
							})}
						</Fragment>
					))}
				</div>
			</aside>

			{props.sidebarSlot}

			{props.children}
		</div>
	);
}

export function AppLayoutDrawer(props: {
	children: React.ReactNode;
	onClose: () => void;
}) {
	const panelRef = useRef<HTMLElement>(null);

	// Close on Escape key
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") props.onClose();
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [props.onClose]);

	return (
		<>
			<div
				className={clsx(
					"fixed inset-0",
					"z-app-layout-drawer-content",
					"bg-overlay-bg",
					"md:left-app-layout-sidebar-size",
				)}
				aria-hidden
				onClick={props.onClose}
			/>

			<aside
				ref={panelRef}
				role={"dialog"}
				className={clsx(
					"fixed left-0 top-app-layout-sidebar-size bottom-0 right-0 flex flex-col",
					"md:top-0 md:pl-app-layout-sidebar-size",

					"max-w-xl",
					"md:max-w-2xl",

					"z-app-layout-drawer-content",

					"rounded-r-xl bg-bg-surface",
				)}
			>
				<div className={"grow overflow-y-auto p-14 pb-8"}>{props.children}</div>
			</aside>
		</>
	);
}

export function AppLayoutContent(props: ComponentProps<"main">) {
	return (
		<main
			{...props}
			className={clsx(
				"flex-1 relative w-3xl mx-auto max-w-full md:max-w-app-layout-content-size",
				"p-6 pt-8 sm:p-12 sm:pt-14 md:py-16",
				props.className,
			)}
		/>
	);
}
