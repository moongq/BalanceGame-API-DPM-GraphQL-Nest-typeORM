import { InputType, Field } from "@nestjs/graphql";

import { CreateBalanceGameKeywordInput } from "../../balance-game-keyword/dto/create-balance-game-keyword.input";
import { CreateBalanceGameSelectionInput } from "../../balance-game-selection/dto/create-balance-game-selection.input";

@InputType()
export class CreateBalanceGameInput {
  // user token으로 인한 삭제
  // @Field((type) => String)
  // userId: string;

  @Field(() => String)
  description!: string;

  @Field(() => [CreateBalanceGameSelectionInput])
  balanceGameSelections!: [CreateBalanceGameSelectionInput];

  @Field(() => [CreateBalanceGameKeywordInput])
  balanceGameKeywords!: [CreateBalanceGameKeywordInput];
}
