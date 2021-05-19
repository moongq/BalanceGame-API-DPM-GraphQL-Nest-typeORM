import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class CreateReplyInput {
  @Field()
  balanceGameId: string;

  @Field()
  commentId: string;

  @Field()
  content: string;

  @Field()
  color?: string;
}
