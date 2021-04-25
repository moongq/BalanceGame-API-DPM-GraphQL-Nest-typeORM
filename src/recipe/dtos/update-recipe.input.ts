import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, Length, MaxLength } from 'class-validator';

@InputType()
export class UpdateRecipeInput {
    @Field()
    id: string;


  @Field()
  @MaxLength(30)
  title: string;

  @Field()
  @Length(30, 255)
  description: string;

}