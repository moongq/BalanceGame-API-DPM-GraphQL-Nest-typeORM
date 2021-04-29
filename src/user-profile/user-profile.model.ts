import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { User } from 'src/user/user.model';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, UpdateDateColumn, CreateDateColumn, JoinColumn } from 'typeorm';

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
  userImage: string;

  @Column()
  @Field(type => Int)
  level: string;

  @CreateDateColumn({ type: 'timestamp'})
  @Field(type => Date)
  createdAt: string;

  @UpdateDateColumn({type: "timestamp"})
  @Field(type => Date)
  updatedAt: Date;
  
  @OneToOne(() => User, user=> user.profile)
  user: User;

}
