import { InputType, Int, Field } from "@nestjs/graphql";

@InputType()
export class CreateBalanceGameThumbInput {
  @Field()
  userId: string;

  @Field()
  balanceGameId: string;
}
