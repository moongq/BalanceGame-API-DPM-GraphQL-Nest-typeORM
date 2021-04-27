import { InputType, Int, Field } from '@nestjs/graphql';
import { IsOptional, Length, MaxLength } from 'class-validator';

@InputType()
export class CreateUserInput {

  // @Field({nullable: true})
  // id: string;

  @Field()
  social_id: string;

  @Field()
  platform_type?: string;

}
