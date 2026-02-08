import { PrismaClient } from "@generated/prisma";
import { Injectable, type Type } from "@nestjs/common";
import { PrismaPg } from "@prisma/adapter-pg";
import { ConfigService } from "../config/config.service";

export function createPrismaAdapter(databaseUrl: string) {
	return new PrismaPg({ connectionString: databaseUrl, min: 9 });
}

function withExtensions(config: ConfigService) {
	const instance = new PrismaClient({
		adapter: createPrismaAdapter(config.get("DATABASE_URL")),
		// log: ["query", "info", "warn", "error"],
	});
	instance.$connect();

	return instance;
}

const ExtendedPrismaClient = class {
	constructor(config: ConfigService) {
		// biome-ignore lint/correctness/noConstructorReturn: magic, @see https://github.com/prisma/prisma/issues/18628#issuecomment-2655850811
		return withExtensions(config);
	}
} as Type<ReturnType<typeof withExtensions>>;

@Injectable()
export class PrismaService extends ExtendedPrismaClient {
	// biome-ignore lint/complexity/noUselessConstructor: nest magic
	constructor(config: ConfigService) {
		super(config);
	}
}
