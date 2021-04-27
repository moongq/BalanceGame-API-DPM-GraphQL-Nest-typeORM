import { CreateUserProfileInput } from './create-user-profile.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserProfileInput extends PartialType(CreateUserProfileInput) {
  @Field(() => Int)
  id: number;
}
