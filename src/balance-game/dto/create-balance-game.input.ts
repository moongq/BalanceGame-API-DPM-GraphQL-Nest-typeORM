import { InputType, Int, Field } from "@nestjs/graphql";
import { IsOptional } from "class-validator";
import { User } from "../../user/user.model";

@InputType()
export class CreateBalanceGameInput {
  @Field()
  description: string;

  @Field()
  voteCount?: number;

  @Field()
  thumbsUp?: number;

  @Field()
  userId: string;
}
