import { Field, ObjectType } from "@nestjs/graphql";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Recipe {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field(() => String)
  @Column()
  title: string;

  @Field(() => String, { nullable: true })
  @Column()
  description?: string;
}
