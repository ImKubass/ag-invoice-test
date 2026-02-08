import { Query, Resolver } from "@nestjs/graphql";
import { Public } from "../../auth/utils";

@Resolver()
export class StatusResolver {
	@Public()
	@Query(() => String)
	status(): string {
		return "Server is running";
	}
}
