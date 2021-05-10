import { InputType, Int, Field } from "@nestjs/graphql";

@InputType()
export class UpdateBalanceGameKeywordInput {
  @Field()
  id?: string;
  
  @Field()
  name?: string;
}
