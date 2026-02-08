import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { api } from "../../api/api.js";
import { Button } from "../../components/basic-ui/Button";
import { TextField } from "../../components/basic-ui/TextField";
import { authStore } from "../../modules/auth/auth.js";
import {
	type LoginSchema,
	loginSchema,
} from "../../modules/auth/auth-user.schema.js";
import { getConfig } from "../../utils/config.js";

export const Route = createFileRoute("/_public/login")({
	head: () => {
		const { appName } = getConfig();
		return {
			meta: [
				{
					title: `Login | ${appName}`,
				},
			],
		};
	},
	component: LoginComponent,
});

function LoginComponent() {
	const navigate = useNavigate();

	const { mutate: login } = api.useLoginMutation({
		onSuccess: async (data) => {
			authStore.set(data.login.accessToken);
			await navigate({ to: "/app" });
		},
		onError: () => {
			alert("Login failed");
		},
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(loginSchema),
	});

	const onSubmit = (data: LoginSchema) => {
		login({
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
				<h1 className={"text-center typo-heading-m"}>Login</h1>
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
				<Button
					type={"submit"}
					variant={"primary"}
					className={"justify-self-center"}
				>
					Login
				</Button>
			</form>
			<div className={"typo-body text-text-secondary text-center"}>
				Don’t have an account?{" "}
				<Link to="/register" className={"font-bold text-text-accent"}>
					Create Account
				</Link>
				.
			</div>
		</main>
	);
}
