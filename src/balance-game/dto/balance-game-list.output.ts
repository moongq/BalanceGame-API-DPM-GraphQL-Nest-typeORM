import { ObjectType, Field } from "@nestjs/graphql";

import { BalanceGame } from "../balance-game.model";

@ObjectType()
export class BalanceGameList {
  @Field({description: "전체 밸런스게임 수"})
  num: number;

  @Field(()=> [BalanceGame])
  balanceGame: BalanceGame[];
}
