import { CreateReplyInput } from "./create-reply.input";
import { InputType, Field, Int, PartialType } from "@nestjs/graphql";

@InputType()
export class UpdateReplyInput {
  @Field()
  balanceGameId: string;

  @Field()
  replyId: string;

  @Field()
  content: string;
}
