import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class CreateNotificationInput {
  @Field()
  userId: string;

  @Field()
  balanceGameId: string;

  @Field()
  commentId?: string;

  @Field()
  content: string;

  @Field()
  replyNickname?: string;
}
