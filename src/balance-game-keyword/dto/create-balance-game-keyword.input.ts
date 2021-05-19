import { InputType, Int, Field } from "@nestjs/graphql";

@InputType()
export class CreateBalanceGameKeywordInput {
  @Field()
  name!: string;

  @Field()
  balanceGameId?: string;
}
