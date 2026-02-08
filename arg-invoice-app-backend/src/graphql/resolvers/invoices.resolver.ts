import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { InvoiceModel } from "../models/invoice.model";
import { InvoicesService } from "../../invoices/invoices.service";
import { UserData } from "../../auth/utils";
import { type User } from "@generated/prisma";
import { CreateInvoiceInput, UpdateInvoiceInput } from "../dtos/invoice.dto";
import { SuccessModel } from "../models/success.model";
import { BadRequestException } from "@nestjs/common";
import { InvoiceInputSchema } from "../../validation/invoice.schema";
import { z } from "zod";

@Resolver(() => InvoiceModel)
export class InvoicesResolver {
	constructor(private readonly invoicesService: InvoicesService) {}

	@Query(() => [InvoiceModel])
	async invoices(@UserData() user: User) {
		return this.invoicesService.findAll(user.id);
	}

	@Query(() => InvoiceModel)
	async invoice(
		@UserData() user: User,
		@Args("id") id: number,
	): Promise<InvoiceModel> {
		return this.invoicesService.getOneForUser(id, user.id);
	}

	@Mutation(() => InvoiceModel)
	async createInvoice(
		@UserData() user: User,
		@Args("input") input: CreateInvoiceInput,
	): Promise<InvoiceModel> {
		const { success, error } = z.safeParse(InvoiceInputSchema, input);
		if (!success) {
			throw new BadRequestException(z.prettifyError(error));
		}
		return this.invoicesService.create(user.id, input);
	}

	@Mutation(() => InvoiceModel)
	async updateInvoice(
		@UserData() user: User,
		@Args("id") id: number,
		@Args("input") input: UpdateInvoiceInput,
	): Promise<InvoiceModel> {
		const { success, error } = z.safeParse(InvoiceInputSchema, input);
		if (!success) {
			throw new BadRequestException(z.prettifyError(error));
		}
		return this.invoicesService.update(id, user.id, input);
	}

	@Mutation(() => SuccessModel)
	async deleteInvoice(@UserData() user: User, @Args("id") id: number) {
		await this.invoicesService.delete(id, user.id);
		return { success: true };
	}

	@Mutation(() => InvoiceModel, {
		description: "Switch invoice between `paid` and `pending` status",
	})
	async markAsPaid(
		@UserData() user: User,
		@Args("id") id: number,
		@Args("paid") paid: boolean,
	) {
		return this.invoicesService.markAsPaid(id, user.id, paid);
	}
}
