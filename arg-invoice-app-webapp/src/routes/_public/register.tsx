import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { api } from "../../api/api.js";
import { Button } from "../../components/basic-ui/Button";
import { TextField } from "../../components/basic-ui/TextField";
import {
	type RegisterSchema,
	registerSchema,
} from "../../modules/auth/auth-user.schema.js";
import { getConfig } from "../../utils/config.js";

export const Route = createFileRoute("/_public/register")({
	head: () => {
		const { appName } = getConfig();
		return {
			meta: [
				{
					title: `Create Account | ${appName}`,
				},
			],
		};
	},
	component: RegisterComponent,
});

function RegisterComponent() {
	const navigate = useNavigate();

	const { mutate: registerUser } = api.useRegisterMutation({
		onSuccess: async (data) => {
			if (!data.register.success) {
				alert("Register failed.");
				return;
			}

			await navigate({ to: "/login" });
		},
		onError: () => {
			alert("Registration failed");
		},
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(registerSchema),
	});

	const onSubmit = (data: RegisterSchema) => {
		registerUser({
			input: {
				email: data.email,
				password: data.password,
			},
		});
	};

	return (
		<main
			className={
				"bg-bg-surface p-6 grid gap-6 rounded-lg md:max-w-full md:w-120 md:p-12"
			}
		>
			<form
				className={"grid gap-6"}
				onSubmit={handleSubmit(onSubmit)}
				noValidate
			>
				<h1 className={"text-center typo-heading-m"}>Create Account</h1>
				<TextField
					{...register("email")}
					label={"E-mail"}
					type={"email"}
					error={!!errors.email}
					message={errors.email?.message}
				/>
				<TextField
					{...register("password")}
					label={"Password"}
					type={"password"}
					error={!!errors.password}
					message={errors.password?.message}
				/>
				<TextField
					{...register("passwordConfirmed")}
					label={"Confirm Password"}
					type={"password"}
					error={!!errors.passwordConfirmed}
					message={errors.passwordConfirmed?.message}
				/>

				{errors.root?.passwords && (
					<span className="typo-body--var text-input-error-text text-center">
						{errors.root.passwords.message}
					</span>
				)}

				<Button
					type={"submit"}
					variant={"primary"}
					className={"justify-self-center"}
				>
					Create Account
				</Button>
			</form>
			<div className={"typo-body text-text-secondary text-center"}>
				Already have an account?{" "}
				<Link to="/login" className={"font-bold text-text-accent"}>
					Login
				</Link>
				.
			</div>
		</main>
	);
}
