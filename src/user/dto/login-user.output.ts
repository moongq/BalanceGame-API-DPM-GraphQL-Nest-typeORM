import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class LoginUserOutput {
  @Field()
  jwt: string;

  @Field()
  email: string | null;

  @Field({description: "가입한 적이 없으면 REGISTER, 가입한 user는 LOGIN"})
  status: string;
}
