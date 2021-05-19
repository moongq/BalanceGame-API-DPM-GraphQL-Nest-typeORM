import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class CreateUserProfileInput {
  @Field()
  email: string | null;

  @Field()
  nickname: string;

  @Field()
  userImage: string;
}
