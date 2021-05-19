import { CreateCommentInput } from "./create-comment.input";
import { InputType, Field, Int, PartialType } from "@nestjs/graphql";

@InputType()
export class UpdateCommentInput {
  @Field()
  id!: string;

  @Field(() => String)
  content!: string;

  // @Field(() => String)
  // color?: string;
}
