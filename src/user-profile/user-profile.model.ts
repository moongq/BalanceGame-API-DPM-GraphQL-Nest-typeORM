import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, UpdateDateColumn, CreateDateColumn, JoinColumn } from 'typeorm';
import { User } from '../user/user.model';

@ObjectType()
@Entity()
export class UserProfile {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

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

  @OneToOne(() => User, user=> user.profile)
  user: User;

  @CreateDateColumn({ type: 'timestamp'})
  @Field(type => Date)
  created_at: string;

  @UpdateDateColumn({type: "timestamp"})
  @Field(type => Date)
  updatedAt: Date;

}
