import { Logger, Module, OnModuleDestroy } from "@nestjs/common";
import { ConfigModule } from "../config/config.module";
import { PrismaService } from "./prisma.service";

@Module({
	imports: [ConfigModule],
	providers: [PrismaService],
	exports: [PrismaService],
})
export class PrismaModule implements OnModuleDestroy {
	private readonly logger = new Logger(PrismaModule.name);
	constructor(private readonly prismaService: PrismaService) {}

	async onModuleDestroy() {
		await this.prismaService.$disconnect();
		this.logger.log("Prisma module disconnected successfully.");
	}
}
