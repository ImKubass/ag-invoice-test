import { registerEnumType } from "@nestjs/graphql";
import { InvoiceStatus } from "@generated/prisma";
import { Currency } from "../enums";

registerEnumType(InvoiceStatus, { name: "InvoiceStatus" });
registerEnumType(Currency, { name: "Currency" });
