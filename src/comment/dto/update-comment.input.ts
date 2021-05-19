import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class UpdateCommentInput {
  @Field()
  id: string;

  @Field(() => String)
  content: string;

  // @Field(() => String)
  // color?: string;
}
