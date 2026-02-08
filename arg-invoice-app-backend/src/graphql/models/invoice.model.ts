import { InvoiceStatus } from "@generated/prisma";
import {
	Field,
	Float,
	GraphQLISODateTime,
	Int,
	ObjectType,
} from "@nestjs/graphql";
import { Currency } from "../../enums";
import { Decimal } from "../../generated/prisma/internal/prismaNamespace";

@ObjectType("Invoice")
export class InvoiceModel {
	@Field((type) => Int) id: number;
	@Field((type) => String) number: string;
	@Field((type) => InvoiceStatus) status: InvoiceStatus;
	@Field((type) => GraphQLISODateTime) issueDate: Date;
	@Field((type) => GraphQLISODateTime) dueDate: Date;
	@Field((type) => Float) amount: Decimal;
	@Field((type) => Currency) currency: string;
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
	@Field((type) => [InvoiceItemModel]) items: InvoiceItemModel[];
}

@ObjectType("InvoiceItem")
export class InvoiceItemModel {
	@Field((type) => Int) id: number;
	@Field((type) => Float) quantity: Decimal;
	@Field((type) => Float) pricePerUnit: Decimal;
	@Field((type) => String) description: string;
}

@ObjectType("Invoices")
export class InvoicesModel {
	@Field((type) => [InvoiceModel]) data: InvoiceModel[];
	@Field((type) => Int) total: number;
	@Field((type) => Int) page: number;
	@Field((type) => Int) pageSize: number;
}
