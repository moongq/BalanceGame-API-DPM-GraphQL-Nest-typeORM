import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class CreateCommentInput {
  @Field()
  balanceGameId?: string;

  @Field()
  content!: string;

  @Field()
  color?: string;
}
