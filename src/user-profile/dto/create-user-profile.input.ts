import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserProfileInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
