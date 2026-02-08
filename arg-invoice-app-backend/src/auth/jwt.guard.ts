import {
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AppRequest, getRequest, IS_PUBLIC_KEY } from "./utils";
import { AuthService } from "./auth.service";
import { UsersService } from "../users/users.service";

@Injectable()
export class JwtGuard {
	constructor(
		private readonly authService: AuthService,
		private readonly usersService: UsersService,
		private readonly reflector: Reflector,
	) {}

	async canActivate(context: ExecutionContext) {
		const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
			context.getHandler(),
			context.getClass,
		]);
		if (isPublic) {
			return true;
		}

		const request = getRequest(context);
		const token = this.extractTokenFromHeader(request);
		if (!token) {
			throw new UnauthorizedException();
		}

		try {
			const payload = await this.authService.verifyJwt(token);
			const user = await this.usersService.getOne(payload.sub);
			request.user = user;
		} catch (err) {
			throw new UnauthorizedException();
		}

		return true;
	}

	private extractTokenFromHeader(request: AppRequest): string | undefined {
		const [type, token] = request.headers.authorization?.split(" ") ?? [];
		return type === "Bearer" ? token : undefined;
	}
}
