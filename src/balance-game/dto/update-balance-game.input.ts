import { InputType, Field } from "@nestjs/graphql";

import { CreateBalanceGameKeywordInput } from "../../balance-game-keyword/dto/create-balance-game-keyword.input";
import { UpdateBalanceGameSelectionInput } from "../../balance-game-selection/dto/update-balance-game-selection.input";

@InputType()
export class UpdateBalanceGameInput {
  @Field(() => String)
  balanceGameId!: string;

  @Field(() => String)
  description?: string;

  @Field(() => [UpdateBalanceGameSelectionInput])
  balanceGameSelections?: [UpdateBalanceGameSelectionInput];

  // Q: 그냥 다 지워버리고 새로 만드는게 나은가?
  @Field(() => [CreateBalanceGameKeywordInput])
  balanceGameKeywords?: [CreateBalanceGameKeywordInput];
}
