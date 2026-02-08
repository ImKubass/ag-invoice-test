import { Injectable } from "@nestjs/common";

export interface ConfigSchema {
	APP_PORT: number;
	DATABASE_URL: string;
	JWT_SECRET: string;
	JWT_ACCESS_TOKEN_EXPIRATION: number;
}

type ConfigKey = keyof ConfigSchema;

@Injectable()
export class ConfigService {
	private readonly config: { [K in ConfigKey]: ConfigSchema[K] };

	constructor() {
		this.config = {
			APP_PORT: this.getEnv("APP_PORT", "number"),
			DATABASE_URL: this.getEnv("DATABASE_URL", "string"),
			JWT_SECRET: this.getEnv("JWT_SECRET", "string"),
			JWT_ACCESS_TOKEN_EXPIRATION: this.getEnv(
				"JWT_ACCESS_TOKEN_EXPIRATION",
				"number",
			),
		};
	}

	get<K extends ConfigKey>(key: K): ConfigSchema[K] {
		return this.config[key];
	}

	private getEnv<K extends ConfigKey>(
		key: K,
		type: "string" | "number" | "boolean",
	): ConfigSchema[K] {
		const envValue = process.env[key];
		if (envValue === undefined) {
			throw new Error(`Environment variable ${key} is not set`);
		}

		switch (type) {
			case "number": {
				const num = Number(envValue);
				if (Number.isNaN(num)) {
					throw new Error(`Environment variable ${key} must be a number`);
				}
				return num as ConfigSchema[K];
			}
			case "boolean": {
				if (
					envValue !== "true" &&
					envValue !== "false" &&
					envValue !== "1" &&
					envValue !== "0"
				) {
					throw new Error(`Environment variable ${key} must be a boolean`);
				}
				return (envValue === "true" ||
					envValue === "1") as unknown as ConfigSchema[K];
			}
			default: {
				return envValue as ConfigSchema[K];
			}
		}
	}
}
