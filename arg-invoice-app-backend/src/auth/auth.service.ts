import {
	ConflictException,
	Injectable,
	UnauthorizedException,
} from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { PasswordService } from "./password.service";
import { JwtModel } from "../graphql/models/jwt.model";
import { JwtPayload } from "./utils";
import { Prisma, User } from "@generated/prisma";
import { ConfigService } from "../config/config.service";
import { RegisterInput } from "../graphql/dtos/auth.input";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class AuthService {
	constructor(
		private readonly configService: ConfigService,
		private readonly usersService: UsersService,
		private readonly jwtService: JwtService,
		private readonly passwordService: PasswordService,
		private readonly prismaService: PrismaService,
	) {}

	/**
	 * Verify credentials and return JWT token.
	 *
	 * @param email
	 * @param password
	 */
	async login(email: string, password: string): Promise<JwtModel> {
		const user = await this.usersService.findOneByEmail(email);
		if (!user) {
			throw new UnauthorizedException();
		}

		if (!(await this.passwordService.verifyPassword(password, user.password))) {
			throw new UnauthorizedException();
		}

		return {
			accessToken: await this.generateAccessToken(user),
		};
	}

	/**
	 * Register new user.
	 *
	 * @param data
	 */
	async register(data: RegisterInput) {
		if (await this.usersService.findOneByEmail(data.email)) {
			throw new ConflictException("Email already in use");
		}

		const userCreateData: Prisma.UserCreateInput = {
			email: data.email,
			password: await this.passwordService.makePassword(data.password),
		};

		await this.prismaService.user.create({ data: userCreateData });
	}

	async verifyJwt(token: string) {
		return this.jwtService.verifyAsync<JwtPayload>(token);
	}

	private async generateAccessToken(user: User) {
		const payload: JwtPayload = {
			sub: user.id,
		};
		return this.jwtService.signAsync(payload, {
			expiresIn: this.configService.get("JWT_ACCESS_TOKEN_EXPIRATION"),
			header: { alg: "HS256" },
		});
	}
}
