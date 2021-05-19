import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class UpdateReplyInput {
  @Field()
  replyId: string;

  @Field()
  content: string;
}
