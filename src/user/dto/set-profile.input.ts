import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class SetProfileInput {
  @Field()
  nickname: string;

  @Field()
  email: string;
}
