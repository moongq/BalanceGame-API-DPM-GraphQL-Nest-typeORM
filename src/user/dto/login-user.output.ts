import { ObjectType, Int, Field } from '@nestjs/graphql';

@ObjectType()
export class LoginUserOutput {
  @Field()
  jwt: string;

  @Field()
  email: string | null;
}