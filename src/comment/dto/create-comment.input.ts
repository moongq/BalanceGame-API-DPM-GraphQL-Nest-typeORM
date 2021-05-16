import { InputType, Int, Field } from "@nestjs/graphql";

@InputType()
export class CreateCommentInput {
  @Field()
  userId: string;

  @Field()
  balanceGameId: string;

  @Field()
  content: string;

  @Field()
  parentId?: string;

  @Field()
  color: string;
}
