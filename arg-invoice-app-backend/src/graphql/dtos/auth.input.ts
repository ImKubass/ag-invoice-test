import { Field, InputType } from "@nestjs/graphql";

@InputType("LoginInput")
export class LoginInput {
	@Field((type) => String) email: string;
	@Field((type) => String) password: string;
}

@InputType("RegisterInput")
export class RegisterInput {
	@Field((type) => String) email: string;
	@Field((type) => String) password: string;
}
