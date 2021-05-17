import { CreateBalanceGameSelectionVoteInput } from './create-balance-game-selection-vote.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateBalanceGameSelectionVoteInput {
  @Field(() => String)
  balanceGameId: string

  @Field(() => String)
  newBalanceGameSelectionId: string
}
