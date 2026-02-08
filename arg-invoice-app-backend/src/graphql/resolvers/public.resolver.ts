import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { LoginInput, RegisterInput } from "../dtos/auth.input";
import { JwtModel } from "../models/jwt.model";
import { AuthService } from "../../auth/auth.service";
import { SuccessModel } from "../models/success.model";
import { Public } from "../../auth/utils";
import { BadRequestException } from "@nestjs/common";
import { RegistrationInputSchema } from "../../validation/auth.schema";
import { z } from "zod";

@Resolver()
export class PublicResolver {
	constructor(private readonly authService: AuthService) {}

	@Public()
	@Mutation(() => JwtModel, {
		description:
			"\"Authenticate user with email and password and return a JWT access token. The token must be passed in the Authorization header for authenticated requests (e.g., 'Authorization: Bearer <token>')",
	})
	async login(@Args("input") input: LoginInput): Promise<JwtModel> {
		return this.authService.login(input.email, input.password);
	}

	@Public()
	@Mutation(() => SuccessModel)
	async register(
		@Args("input", { type: () => RegisterInput }) input: RegisterInput,
	) {
		const { success, error } = z.safeParse(RegistrationInputSchema, input);
		if (!success) {
			throw new BadRequestException(z.prettifyError(error));
		}
		await this.authService.register(input);
		return { success: true };
	}
}
