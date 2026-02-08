import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType("AccessToken")
export class JwtModel {
	@Field((type) => String) accessToken: string;
}
