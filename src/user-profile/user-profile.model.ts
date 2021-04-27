import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, UpdateDateColumn, CreateDateColumn } from 'typeorm';

@ObjectType()
export class UserProfile {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  @Field(type => String)
  email: string;

  @Column()
  @Field(type => String)
  nickname: string;

  @Column()
  @Field(type => String)
  user_image: string;

  @Column()
  @Field(type => Int)
  level: string;

  @CreateDateColumn({ type: 'timestamp'})
  @Field(type => Date)
  created_at: string;

  @UpdateDateColumn({type: "timestamp"})
  @Field(type => Date)
  updatedAt: Date;

}
