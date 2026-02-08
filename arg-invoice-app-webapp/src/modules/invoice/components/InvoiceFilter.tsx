import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useCallback, useRef } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { Select } from "../../../components/basic-ui/TextField";

const filterSchema = z.object({
	status: z.literal(["pending", "paid", "all"]),
});

type FilterSchema = z.infer<typeof filterSchema>;

export const InvoiceFilter = (props: { className?: string }) => {
	const { status } = useSearch({ strict: false });
	const navigate = useNavigate();

	if (status === undefined) {
		throw new Error(
			"InvoiceFilter component has to be used on a route that has validated the app search parameters",
		);
	}

	const { register, handleSubmit } = useForm({
		resolver: zodResolver(filterSchema),
		defaultValues: {
			status,
		},
	});

	const formRef = useRef<HTMLFormElement>(null);

	const triggerSubmit = useCallback(() => {
		formRef.current?.dispatchEvent(
			new Event("submit", { cancelable: true, bubbles: true }),
		);
	}, []);

	const onSubmit = (data: FilterSchema) => {
		navigate({
			to: ".",
			search: (prev) => ({ ...prev, status: data.status }),
		});
	};

	return (
		<form
			className={props.className}
			ref={formRef}
			onSubmit={handleSubmit(onSubmit)}
		>
			<Select {...register("status", { onChange: triggerSubmit })}>
				<option value={"pending"}>Pending</option>
				<option value={"paid"}>Paid</option>
				<option value={"all"}>All</option>
			</Select>
		</form>
	);
};
