import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";

@Injectable()
export class PasswordService {
	private saltRounds = 10;

	async makePassword(plainPassword: string) {
		return bcrypt.hash(plainPassword, this.saltRounds);
	}

	async verifyPassword(plainPassword: string, hashedPassword: string) {
		return bcrypt.compare(plainPassword, hashedPassword);
	}
}
