import {
	Field,
	Float,
	GraphQLISODateTime,
	InputType,
	Int,
} from "@nestjs/graphql";
import { Currency } from "../../enums";

@InputType("InvoiceItemInput")
export class InvoiceItemInput {
	@Field((type) => Int, { nullable: true }) id: number | null;
	@Field((type) => Float) quantity: number;
	@Field((type) => Float) pricePerUnit: number;
	@Field((type) => String) description: string;
}

@InputType("CreateInvoiceInput")
export class CreateInvoiceInput {
	@Field((type) => GraphQLISODateTime) issueDate: Date;
	@Field((type) => GraphQLISODateTime) dueDate: Date;
	@Field((type) => Currency, { nullable: true }) currency?: string;
	@Field((type) => String) projectDescription: string;
	@Field((type) => String) vendorStreet: string;
	@Field((type) => String) vendorCity: string;
	@Field((type) => String) vendorZip: string;
	@Field((type) => String) vendorCountry: string;
	@Field((type) => String) customerName: string;
	@Field((type) => String) customerEmail: string;
	@Field((type) => String) customerStreet: string;
	@Field((type) => String) customerCity: string;
	@Field((type) => String) customerZip: string;
	@Field((type) => String) customerCountry: string;
	@Field((type) => [InvoiceItemInput]) items: InvoiceItemInput[];
}

@InputType("UpdateInvoiceInput")
export class UpdateInvoiceInput extends CreateInvoiceInput {}
