import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class BalanceGamesState {
  @Field()
  limit: number;

  @Field()
  offset: number;
}
