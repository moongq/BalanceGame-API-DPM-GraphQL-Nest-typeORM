import { InputType, Int, Field } from "@nestjs/graphql";
import { IsOptional } from "class-validator";
import { User } from "../../user/user.model";

@InputType()
export class CreateBalanceGameInput {
  @Field()
  userId: string;

  @Field()
  description: string;
}
