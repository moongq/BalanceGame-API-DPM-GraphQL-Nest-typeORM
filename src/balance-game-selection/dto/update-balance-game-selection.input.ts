import { CreateBalanceGameSelectionInput } from "./create-balance-game-selection.input";
import { InputType, Field, Int, PartialType } from "@nestjs/graphql";

@InputType()
export class UpdateBalanceGameSelectionInput extends PartialType(CreateBalanceGameSelectionInput) {
  @Field(() => Int)
  id: number;
}
