import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType("User")
export class UserModel {
	@Field((type) => Int) id: number;
	@Field() email: string;
}
