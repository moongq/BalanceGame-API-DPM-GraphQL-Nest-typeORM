import { InputType, Int, Field } from "@nestjs/graphql";

@InputType()
export class CreateBalanceGameSelectionVoteInput {
  @Field()
  userId: string;

  @Field()
  balanceGameId: string;

  @Field()
  balanceGameSelectionId: string;
}
