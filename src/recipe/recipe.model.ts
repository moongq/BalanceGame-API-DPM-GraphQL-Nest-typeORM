import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';


@ObjectType()
@Entity()
export class Recipe {
  @PrimaryGeneratedColumn()
  @Field(type => ID)
  id: string;

  @Column()
  @Field()
  title: string;

  @Column()
  @Field({ nullable: true })
  description?: string;

}