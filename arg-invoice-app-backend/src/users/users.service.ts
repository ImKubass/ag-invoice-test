import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class UsersService {
	constructor(private readonly prismaService: PrismaService) {}

	async getOne(id: number) {
		return this.prismaService.user.findUniqueOrThrow({
			where: { id },
		});
	}

	async findOneByEmail(email: string) {
		return this.prismaService.user.findUnique({ where: { email } });
	}

	async findAll() {
		return this.prismaService.user.findMany();
	}
}
