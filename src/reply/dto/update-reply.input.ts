import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class UpdateReplyInput {
  @Field()
  balanceGameId: string;

  @Field()
  replyId: string;

  @Field()
  content: string;
}
