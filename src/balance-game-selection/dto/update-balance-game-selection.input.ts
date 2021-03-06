import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class UpdateBalanceGameSelectionInput {
  @Field()
  id!: string;

  @Field()
  description?: string;

  @Field()
  textColor?: string;

  @Field()
  backgroundColor?: string;

  @Field()
  backgroundImage?: string;

  @Field()
  order?: number;
}
