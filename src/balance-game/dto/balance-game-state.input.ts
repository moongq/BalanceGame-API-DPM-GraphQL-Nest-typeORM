import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class BalanceGamesStateInput {
  @Field({description: "밸런스 게임 나오는 갯수"})
  limit: number;

  @Field({description: "skip할 밸런스 게임 갯수(현재 웹에 나와있는 밸런스 게임 갯수 넣으시면 됩니다."})
  offset: number;
}
