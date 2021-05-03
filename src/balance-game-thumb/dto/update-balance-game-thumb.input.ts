import { CreateBalanceGameThumbInput } from './create-balance-game-thumb.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateBalanceGameThumbInput extends PartialType(CreateBalanceGameThumbInput) {
  @Field(() => Int)
  id: number;
}
