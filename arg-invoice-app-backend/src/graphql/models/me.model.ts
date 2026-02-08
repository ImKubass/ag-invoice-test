import { ObjectType } from "@nestjs/graphql";
import { UserModel } from "./user.model";

@ObjectType("Me")
export class MeModel extends UserModel {}
