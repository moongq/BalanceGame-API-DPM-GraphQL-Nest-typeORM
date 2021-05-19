import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class LoginUserInput {
  @Field()
  socialKey: string;

  @Field()
  socialType: string;
}
