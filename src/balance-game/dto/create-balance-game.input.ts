import { InputType, Int, Field } from "@nestjs/graphql";
import { IsOptional } from "class-validator";
import { BalanceGameKeyword } from "../../balance-game-keyword/balance-game-keyword.model";
import { CreateBalanceGameKeywordInput } from "../../balance-game-keyword/dto/create-balance-game-keyword.input";
import { CreateBalanceGameSelectionInput } from "../../balance-game-selection/dto/create-balance-game-selection.input";
import { User } from "../../user/user.model";

@InputType()
export class CreateBalanceGameInput {
  // user token으로 인한 삭제
  // @Field((type) => String)
  // userId: string;

  @Field((type) => String)
  description: string;

  @Field((type) => [CreateBalanceGameSelectionInput])
  balanceGameSelections: [CreateBalanceGameSelectionInput];

  @Field((type) => [CreateBalanceGameKeywordInput])
  balanceGameKeywords: [CreateBalanceGameKeywordInput];
}
