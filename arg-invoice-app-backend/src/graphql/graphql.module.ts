import { join } from "node:path";
import { useGraphQlJit } from "@envelop/graphql-jit";
import { YogaDriver, YogaDriverConfig } from "@graphql-yoga/nestjs";
import { Module } from "@nestjs/common";
import { GraphQLModule as NestGraphQLModule } from "@nestjs/graphql";
import { UsersModule } from "../users/users.module";
import { StatusResolver } from "./resolvers/status.resolver";
import { PublicResolver } from "./resolvers/public.resolver";
import { AuthModule } from "../auth/auth.module";
import { MeResolver } from "./resolvers/me.resolver";
import { APP_GUARD } from "@nestjs/core";
import { JwtGuard } from "../auth/jwt.guard";
import { InvoicesResolver } from "./resolvers/invoices.resolver";
import { InvoicesModule } from "../invoices/invoices.module";
import "./enums";

@Module({
	imports: [
		AuthModule,
		InvoicesModule,
		UsersModule,
		NestGraphQLModule.forRoot<YogaDriverConfig>({
			driver: YogaDriver,
			autoSchemaFile: join(process.cwd(), "src/schema.gql"),
			sortSchema: true,
			plugins: [useGraphQlJit()],
			buildSchemaOptions: {
				numberScalarMode: "integer",
			},
		}),
	],
	providers: [
		InvoicesResolver,
		MeResolver,
		PublicResolver,
		StatusResolver,
		{
			provide: APP_GUARD,
			useClass: JwtGuard,
		},
	],
})
export class GraphqlModule {}
