import { InputType, Int, Field } from "@nestjs/graphql";
import { IsOptional } from "class-validator";
import { UpdateBalanceGameKeywordInput } from "src/balance-game-keyword/dto/update-balance-game-keyword.input";
import { UpdateBalanceGameSelectionInput } from "src/balance-game-selection/dto/update-balance-game-selection.input";
import { BalanceGameKeyword } from "../../balance-game-keyword/balance-game-keyword.model";
import { CreateBalanceGameKeywordInput } from "../../balance-game-keyword/dto/create-balance-game-keyword.input";
import { CreateBalanceGameSelectionInput } from "../../balance-game-selection/dto/create-balance-game-selection.input";
import { User } from "../../user/user.model";

@InputType()
export class UpdateBalanceGameInput {
  @Field((type) => String)
  title?: string;

  @Field((type) => [UpdateBalanceGameSelectionInput])
  balanceGameSelections?: [UpdateBalanceGameSelectionInput];

  @Field((type) => [UpdateBalanceGameKeywordInput])
  balanceGameKeywords?: [UpdateBalanceGameKeywordInput];
}
