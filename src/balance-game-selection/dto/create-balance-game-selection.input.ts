import { InputType, Int, Field } from "@nestjs/graphql";

@InputType()
export class CreateBalanceGameSelectionInput {
  @Field()
  balanceGameId: string;

  @Field()
  title: string;

  @Field()
  titleColor?: string;

  @Field()
  description?: string;

  @Field()
  backgroundColor?: string;

  @Field()
  backgroundImage?: string;

  @Field()
  order?: string;
}
