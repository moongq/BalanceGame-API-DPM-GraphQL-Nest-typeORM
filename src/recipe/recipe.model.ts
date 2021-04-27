import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Recipe {

  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field(type => String)
  @Column()
  title: string;

  @Field(type => String, { nullable: true })
  @Column()
  description?: string;

}