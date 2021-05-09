import { ObjectType, Int, Field } from '@nestjs/graphql';

@ObjectType()
export class UserJwt {
  @Field()
  socailId: string;

  @Field()
  userId: string;
}