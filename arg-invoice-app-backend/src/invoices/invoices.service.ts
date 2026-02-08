import { InvoiceStatus } from "@generated/prisma";
import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import { Currency } from "../enums";
import {
	CreateInvoiceInput,
	InvoiceItemInput,
	UpdateInvoiceInput,
} from "../graphql/dtos/invoice.dto";
import { PrismaService } from "../prisma/prisma.service";
import { round } from "./calculations";
import { createInvoiceNumber, incrementInvoiceNumber } from "./utils";

@Injectable()
export class InvoicesService {
	constructor(private readonly prismaService: PrismaService) {}

	async getOne(id: number) {
		return this.prismaService.invoice.findUniqueOrThrow({
			where: { id },
			include: { items: true },
		});
	}

	async getOneForUser(id: number, userId: number) {
		const invoice = await this.prismaService.invoice.findFirst({
			where: { id, userId },
			include: { items: true },
		});

		if (!invoice) {
			throw new NotFoundException("Invoice not found");
		}

		return invoice;
	}

	async findAll(userId: number) {
		return this.prismaService.invoice.findMany({
			where: { userId },
			orderBy: { id: "desc" },
			include: { items: true },
		});
	}

	async findPage(
		userId: number,
		options: {
			status?: InvoiceStatus | null;
			page: number;
			pageSize: number;
		},
	) {
		const page = Math.max(1, options.page);
		const pageSize = Math.min(Math.max(1, options.pageSize), 100);
		const where = {
			userId,
			...(options.status ? { status: options.status } : {}),
		};

		const [total, data] = await this.prismaService.$transaction([
			this.prismaService.invoice.count({ where }),
			this.prismaService.invoice.findMany({
				where,
				orderBy: { id: "desc" },
				skip: (page - 1) * pageSize,
				take: pageSize,
			}),
		]);

		return {
			data,
			total,
			page,
			pageSize,
		};
	}

	async create(userId: number, data: CreateInvoiceInput) {
		const invoice = await this.prismaService.invoice.create({
			data: {
				...data,
				number: await this.getNextInvoiceNumberForUser(userId),
				amount: this.calculateInvoiceTotalFromItems(data.items),
				currency: data.currency ?? Currency.czk,
				user: { connect: { id: userId } },
				items: { create: data.items },
			},
		});

		return this.getOne(invoice.id);
	}

	async update(id: number, userId: number, data: UpdateInvoiceInput) {
		const invoice = await this.getOneForUser(id, userId);

		if (invoice.status === InvoiceStatus.paid) {
			throw new BadRequestException("Cannot update paid invoice");
		}

		await this.prismaService.invoice.update({
			where: { id: invoice.id },
			data: {
				...data,
				amount: this.calculateInvoiceTotalFromItems(data.items),
				items: {
					deleteMany: {
						id: {
							// biome-ignore lint/style/noNonNullAssertion: items without id filtered out
							notIn: data.items.filter((i) => !!i.id).map((i) => i.id!),
						},
					},
					upsert: data.items.map((i) => ({
						where: {
							id: i.id || 0,
						},
						create: {
							description: i.description,
							pricePerUnit: i.pricePerUnit,
							quantity: i.quantity,
						},
						update: {
							description: i.description,
							pricePerUnit: i.pricePerUnit,
							quantity: i.quantity,
						},
					})),
				},
			},
		});

		return this.getOne(invoice.id);
	}

	async delete(id: number, userId: number) {
		const invoice = await this.prismaService.invoice.findFirst({
			where: { id, userId },
			include: { items: true },
		});
		if (!invoice) {
			throw new NotFoundException("Invoice not found");
		}
		await this.prismaService.invoice.delete({ where: { id } });
	}

	async markAsPaid(id: number, userId: number, paid: boolean) {
		const invoice = await this.getOneForUser(id, userId);

		const newStatus = paid ? InvoiceStatus.paid : InvoiceStatus.pending;
		if (invoice.status === newStatus) {
			return invoice;
		}

		await this.prismaService.invoice.update({
			where: { id: invoice.id },
			data: { status: newStatus },
		});

		return this.getOne(invoice.id);
	}

	async getNextInvoiceNumberForUser(userId: number): Promise<string> {
		const year = new Date().getFullYear().toString();
		const lastInvoice = await this.prismaService.invoice.findFirst({
			where: { userId, number: { startsWith: `${year}` } },
			orderBy: { id: "desc" },
		});

		if (lastInvoice) {
			return incrementInvoiceNumber(lastInvoice.number);
		}

		return createInvoiceNumber(year, 1);
	}

	private calculateInvoiceTotalFromItems(items: InvoiceItemInput[]) {
		return round(items.reduce((a, b) => a + b.pricePerUnit * b.quantity, 0));
	}
}
