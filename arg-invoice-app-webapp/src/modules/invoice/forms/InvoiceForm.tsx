import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { Button } from "../../../components/basic-ui/Button.js";
import { Input } from "../../../components/basic-ui/TextField.js";
import { type InvoiceSchema, invoiceSchema } from "./invoice.schema.js";

type DeepPartialBoolean<T> = {
	[K in keyof T]?: T[K] extends object ? DeepPartialBoolean<T[K]> : boolean;
};

export function InvoiceForm(props: {
	onSuccessSubmit: (data: InvoiceSchema) => void;
	defaultValues?: Partial<InvoiceSchema>;
	onCancel: () => void;
	readOnly?: DeepPartialBoolean<InvoiceSchema>;
}) {
	const { handleSubmit, register, formState, control } = useForm({
		resolver: zodResolver(invoiceSchema),
		defaultValues: {
			...props.defaultValues,
		},
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name: "items",
	});

	const { errors } = formState;

	return (
		<form
			className={"flex flex-col gap-12"}
			onSubmit={handleSubmit(props.onSuccessSubmit)}
			noValidate
		>
			<fieldset className={"flex flex-col gap-6"}>
				<legend className={"text-text-accent typo-heading-s float-start"}>
					Bill From
				</legend>
				<Input
					label={"Street Address"}
					autoComplete={"billing street-address"}
					{...register("from.streetAddress")}
					error={!!errors.from?.streetAddress}
					message={errors.from?.streetAddress?.message}
					readOnly={props.readOnly?.from?.streetAddress}
				/>
				<div className={"grid grid-dynamic-cols-[8rem] gap-inherit"}>
					<Input
						label={"City"}
						autoComplete={"billing address-level2"}
						{...register("from.city")}
						error={!!errors.from?.city}
						message={errors.from?.city?.message}
						readOnly={props.readOnly?.from?.city}
					/>

					<Input
						label={"Postal Code"}
						autoComplete={"billing postal-code"}
						{...register("from.postalCode")}
						error={!!errors.from?.postalCode}
						message={errors.from?.postalCode?.message}
						readOnly={props.readOnly?.from?.postalCode}
					/>
					<Input
						label={"Country"}
						autoComplete={"billing country-name"}
						{...register("from.country")}
						error={!!errors.from?.country}
						message={errors.from?.country?.message}
						readOnly={props.readOnly?.from?.country}
					/>
				</div>
			</fieldset>
			<fieldset className={"flex flex-col gap-6"}>
				<legend className={"text-text-accent typo-heading-s float-start"}>
					Bill To
				</legend>
				<Input
					label={"Client Name"}
					autoComplete={"shipping name"}
					{...register("to.fullName")}
					error={!!errors.to?.fullName}
					message={errors.to?.fullName?.message}
					readOnly={props.readOnly?.to?.fullName}
				/>
				<Input
					label={"Client Email"}
					type={"email"}
					autoComplete={"shipping email"}
					{...register("to.email")}
					error={!!errors.to?.email}
					message={errors.to?.email?.message}
					readOnly={props.readOnly?.to?.email}
				/>
				<Input
					label={"Street Address"}
					autoComplete={"shipping street-address"}
					{...register("to.streetAddress")}
					error={!!errors.to?.streetAddress}
					message={errors.to?.streetAddress?.message}
					readOnly={props.readOnly?.to?.streetAddress}
				/>
				<div className={"grid grid-dynamic-cols-[8rem] gap-inherit"}>
					<Input
						label={"City"}
						autoComplete={"shipping address-level2"}
						{...register("to.city")}
						error={!!errors.to?.city}
						message={errors.to?.city?.message}
						readOnly={props.readOnly?.to?.city}
					/>
					<Input
						label={"Postal Code"}
						autoComplete={"shipping postal-code"}
						{...register("to.postalCode")}
						error={!!errors.to?.postalCode}
						message={errors.to?.postalCode?.message}
						readOnly={props.readOnly?.to?.postalCode}
					/>
					<Input
						label={"Country"}
						autoComplete={"shipping country-name"}
						{...register("to.country")}
						error={!!errors.to?.country}
						message={errors.to?.country?.message}
						readOnly={props.readOnly?.to?.country}
					/>
				</div>
			</fieldset>

			<fieldset className={"flex flex-col gap-6"}>
				<legend className={"text-text-accent typo-heading-s float-start"}>
					Invoice Details
				</legend>

				<div className={"grid grid-dynamic-cols-[12rem] gap-inherit"}>
					<Input
						label={"Invoice Date"}
						type={"date"}
						{...register("invoiceDate")}
						error={!!errors.invoiceDate}
						message={errors.invoiceDate?.message}
						readOnly={props.readOnly?.invoiceDate}
					/>
					<Input
						label={"Payment Date"}
						type={"date"}
						{...register("paymentDate")}
						error={!!errors.paymentDate}
						message={errors.paymentDate?.message}
						readOnly={props.readOnly?.paymentDate}
					/>
				</div>

				<Input
					label={"Project Description"}
					{...register("projectDescription")}
					error={!!errors.projectDescription}
					message={errors.projectDescription?.message}
					readOnly={props.readOnly?.projectDescription}
				/>
			</fieldset>

			<fieldset className={"flex flex-col gap-6"}>
				<legend className={"text-text-accent typo-heading-s float-start"}>
					Item List
				</legend>
				{errors.items?.root?.message && (
					<p className={"text-red-500 text-sm"}>{errors.items.root.message}</p>
				)}
				{fields.map((field, index) => (
					<div key={field.id} className={"flex flex-wrap sm:flex-nowrap gap-4"}>
						<Input
							label={"Item Name"}
							className={"max-sm:min-w-xs"}
							{...register(`items.${index}.name`)}
							error={!!errors.items?.[index]?.name}
							message={errors.items?.[index]?.name?.message}
							readOnly={props.readOnly?.items?.[index]?.name}
						/>

						<Input
							label={"Quantity"}
							type={"number"}
							{...register(`items.${index}.quantity`)}
							error={!!errors.items?.[index]?.quantity}
							message={errors.items?.[index]?.quantity?.message}
							readOnly={props.readOnly?.items?.[index]?.quantity}
						/>
						<Input
							label={"Price"}
							type={"number"}
							min={0}
							step={"0.01"}
							{...register(`items.${index}.price`)}
							error={!!errors.items?.[index]?.price}
							message={errors.items?.[index]?.price?.message}
							readOnly={props.readOnly?.items?.[index]?.price}
						/>

						{fields.length > 1 && (
							<Button
								variant={"secondary"}
								type={"button"}
								title={"Remove Item"}
								aria-label={"Remove Item"}
								iconStart={"trash"}
								onClick={() => remove(index)}
							></Button>
						)}
					</div>
				))}
				<Button
					variant={"secondary"}
					type={"button"}
					onClick={() => append({ name: "", quantity: 1, price: 0 })}
				>
					+ Add New Item
				</Button>

				{errors.items?.message ? (
					<div className={"text-input-error-text typo-body--var"}>
						{errors.items.message}
					</div>
				) : null}
			</fieldset>

			<div className={"flex flex-wrap gap-4 justify-between sticky  bottom-0"}>
				<Button variant={"secondary"} type={"button"} onClick={props.onCancel}>
					Discard
				</Button>
				<Button variant={"primary"} type={"submit"}>
					Submit
				</Button>
			</div>
		</form>
	);
}
