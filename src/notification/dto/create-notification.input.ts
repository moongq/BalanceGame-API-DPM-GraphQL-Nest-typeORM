import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class CreateNotificationInput {
  @Field()
  kind: string;

  @Field()
  balanceGameId: string;

  @Field()
  userForId: string;

  @Field()
  commentId?: string;

  @Field()
  commentContent?: string;

  @Field()
  replyId?: string;

  @Field()
  replyContent?: string;
}
