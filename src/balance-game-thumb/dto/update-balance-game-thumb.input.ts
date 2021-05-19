import { InputType, Field, Int, PartialType } from "@nestjs/graphql";

import { CreateBalanceGameThumbInput } from "./create-balance-game-thumb.input";

@InputType()
export class UpdateBalanceGameThumbInput extends PartialType(CreateBalanceGameThumbInput) {
  @Field(() => Int)
  id: number;
}
