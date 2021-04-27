import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, UpdateDateColumn, CreateDateColumn } from 'typeorm';
import { UserProfile } from '../user-profile/user-profile.model'

@ObjectType()
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @Field(type => ID)
  id: string;
  
  @Column()
  @Field(type => String)
  social_id: string;

  @Column()
  @Field(type => String)
  platform_type: string;

  @OneToOne(type => UserProfile)
  @JoinColumn()
  profile: UserProfile;

  // :TODO enum으로 수정?
  // @Column()
  // @Field(type => String)
  // status: string;

  @CreateDateColumn({ type: 'timestamp'})
  @Field(type => Date)
  created_at: string;

  @UpdateDateColumn({type: "timestamp"})
  @Field(type => Date)
  updatedAt: Date;

}
