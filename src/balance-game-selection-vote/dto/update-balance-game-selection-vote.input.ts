import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class UpdateBalanceGameSelectionVoteInput {
  @Field(() => String)
  balanceGameId: string;

  @Field(() => String)
  newBalanceGameSelectionId: string;
}
