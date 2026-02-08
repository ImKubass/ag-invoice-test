import { z } from "zod";

export const loginSchema = z.object({
	email: z.email().trim(),
	password: z.string(),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const registerSchema = loginSchema
	.extend({
		password: z
			.string()
			.min(8, "The password has to be at least 8 characters long"),
		passwordConfirmed: z.string().min(1, "Please confirm your password"),
	})
	.refine((data) => data.password === data.passwordConfirmed, {
		message: "Passwords don't match",
		path: ["passwordConfirmed"],
	});

export type RegisterSchema = z.infer<typeof registerSchema>;
