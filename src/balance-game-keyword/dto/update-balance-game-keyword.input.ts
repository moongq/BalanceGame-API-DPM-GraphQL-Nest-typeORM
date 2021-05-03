import { CreateBalanceGameKeywordInput } from './create-balance-game-keyword.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateBalanceGameKeywordInput extends PartialType(CreateBalanceGameKeywordInput) {
  @Field(() => Int)
  id: number;
}
