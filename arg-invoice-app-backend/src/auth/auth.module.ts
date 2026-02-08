import { Module } from "@nestjs/common";
import { UsersModule } from "../users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { PasswordService } from "./password.service";
import { ConfigModule } from "../config/config.module";
import { PrismaModule } from "../prisma/prisma.module";
import { ConfigService } from "../config/config.service";

@Module({
	imports: [
		ConfigModule,
		UsersModule,
		PrismaModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			useFactory: async (config: ConfigService) => ({
				secret: config.get("JWT_SECRET"),
			}),
			inject: [ConfigService],
		}),
	],
	providers: [AuthService, PasswordService],
	exports: [AuthService],
})
export class AuthModule {}
