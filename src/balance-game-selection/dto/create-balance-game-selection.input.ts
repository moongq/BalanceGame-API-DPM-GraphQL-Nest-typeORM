import { InputType, Field } from "@nestjs/graphql";

enum order {
  test1 = 0,
  test2 = 1,
}

@InputType()
export class CreateBalanceGameSelectionInput {
  @Field()
  balanceGameId?: string;

  @Field()
  description!: string;

  @Field()
  textColor?: string;

  @Field()
  backgroundColor?: string;

  @Field()
  backgroundImage?: string;

  @Field()
  order!: number;
}
