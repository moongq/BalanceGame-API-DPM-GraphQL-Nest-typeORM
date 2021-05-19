import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class UserJwt {
  @Field()
  socialId: string;

  @Field()
  userId: string;
}
