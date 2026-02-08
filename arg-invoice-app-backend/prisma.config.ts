import dotenv from "dotenv";
import type { PrismaConfig } from "prisma";
import { env } from "prisma/config";

dotenv.config({
	path: [".env"],
});

export default {
	schema: "prisma/schema.prisma",
	migrations: {
		path: "prisma/migrations",
	},
	datasource: {
		url: env("DATABASE_URL"),
	},
} satisfies PrismaConfig;
