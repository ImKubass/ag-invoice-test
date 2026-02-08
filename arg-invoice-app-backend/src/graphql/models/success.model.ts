import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType("Success")
export class SuccessModel {
	@Field((type) => Boolean) success: boolean;
}
