import { ObjectType, Field } from "@nestjs/graphql";

import { BalanceGame } from "../balance-game.model";

@ObjectType()
export class BalanceGameList {
  @Field()
  num: number;

  @Field()
  balanceGame: BalanceGame[];
}
