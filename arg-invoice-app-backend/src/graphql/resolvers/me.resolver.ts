import { Query, Resolver } from "@nestjs/graphql";
import { UserModel } from "../models/user.model";
import { MeModel } from "../models/me.model";
import { UserData } from "../../auth/utils";
import { type User } from "@generated/prisma";

@Resolver(() => MeModel)
export class MeResolver {
	constructor() {}

	@Query(() => UserModel)
	async me(@UserData() user: User): Promise<UserModel> {
		return user;
	}
}
