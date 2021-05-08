import { InputType, Int, Field } from "@nestjs/graphql";

@InputType()
export class CreateReplyInput {
  @Field()
  userId: string;

  @Field()
  balanceGameId: string;

  @Field()
  commentId: string;

  @Field()
  content: string;
}
