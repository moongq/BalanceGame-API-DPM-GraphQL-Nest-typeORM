import { CreateBalanceGameInput } from './create-balance-game.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateBalanceGameInput extends PartialType(CreateBalanceGameInput) {
  @Field(() => Int)
  id: number;
}
