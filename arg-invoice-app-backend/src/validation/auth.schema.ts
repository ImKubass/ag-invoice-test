import { z } from "zod";

export const RegistrationInputSchema = z.object({
	email: z.email("Email is not valid"),
	password: z.string().min(8, "Password must be at least 8 characters long"),
});
