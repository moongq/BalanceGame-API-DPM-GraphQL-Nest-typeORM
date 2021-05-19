import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, UpdateDateColumn, CreateDateColumn } from "typeorm";

import { User } from "../user/user.model";

@ObjectType()
@Entity()
export class UserProfile {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  @Field(() => String)
  email: string;

  @Column()
  @Field(() => String)
  nickname: string;

  @Column()
  @Field(() => String)
  userImage: string;

  @Column()
  @Field(() => Int)
  level: string;

  @CreateDateColumn({ type: "timestamp" })
  @Field(() => Date)
  createdAt: string;

  @UpdateDateColumn({ type: "timestamp" })
  @Field(() => Date)
  updatedAt: Date;

  @OneToOne(() => User, (user) => user.profile)
  user: User;
}
