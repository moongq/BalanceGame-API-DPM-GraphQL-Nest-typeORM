import { InputType, Int, Field } from "@nestjs/graphql";

@InputType()
export class CreateBalanceGameSelectionVoteInput {
  // 토큰으로 받음 !
  // @Field()
  // userId: string;

  @Field()
  balanceGameId: string;

  @Field()
  balanceGameSelectionId: string;
}
