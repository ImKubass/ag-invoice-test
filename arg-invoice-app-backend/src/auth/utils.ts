import {
	createParamDecorator,
	ExecutionContext,
	SetMetadata,
} from "@nestjs/common";
import type { GqlContextType } from "@nestjs/graphql";
import type { FastifyRequest } from "fastify";
import { User } from "@generated/prisma";

export type JwtPayload = {
	sub: number;
};

export type AppRequest = FastifyRequest & {
	user: User | undefined;
};

export function getRequest(context: ExecutionContext): AppRequest {
	if (context.getType() === "http") {
		return context.switchToHttp().getRequest();
	}
	if (context.getType<GqlContextType>() === "graphql") {
		return context.getArgByIndex(2).req;
	}
	throw new Error(`Invalid context type: ${context.getType()}`);
}

export const IS_PUBLIC_KEY = "isPublic";
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const UserData = createParamDecorator(
	(data: any, context: ExecutionContext): User | undefined => {
		return getRequest(context).user;
	},
);
