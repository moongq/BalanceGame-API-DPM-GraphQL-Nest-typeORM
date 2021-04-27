import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserProfileInput {
  @Field()
  email: string;

  @Field()
  nickname: string;

  @Field()
  user_image: string;

}
