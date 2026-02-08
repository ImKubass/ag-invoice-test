import { InvoiceStatus, type User } from "@generated/prisma";
import { BadRequestException } from "@nestjs/common";
import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { z } from "zod";
import { UserData } from "../../auth/utils";
import { InvoicesService } from "../../invoices/invoices.service";
import { InvoiceInputSchema } from "../../validation/invoice.schema";
import { CreateInvoiceInput, UpdateInvoiceInput } from "../dtos/invoice.dto";
import { InvoiceModel, InvoicesModel } from "../models/invoice.model";
import { SuccessModel } from "../models/success.model";

@Resolver(() => InvoiceModel)
export class InvoicesResolver {
	constructor(private readonly invoicesService: InvoicesService) {}

	@Query(() => InvoicesModel)
	async invoices(
		@UserData() user: User,
		@Args("status", { nullable: true, type: () => InvoiceStatus })
		status?: InvoiceStatus,
		@Args("page", { type: () => Int, defaultValue: 1 }) page?: number,
		@Args("pageSize", { type: () => Int, defaultValue: 20 })
		pageSize?: number,
	) {
		return this.invoicesService.findPage(user.id, {
			status,
			page: page ?? 1,
			pageSize: pageSize ?? 20,
		});
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
