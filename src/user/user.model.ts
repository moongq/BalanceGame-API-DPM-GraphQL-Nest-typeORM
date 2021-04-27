import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, UpdateDateColumn, CreateDateColumn } from 'typeorm';
import { UserProfile } from '../user-profile/user-profile.model'

@ObjectType()
@Entity()
export class User {
  
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;
  
  @Field(type => String)
  @Column()
  social_id: string;

  @Field(type => String)
  @Column()
  platform_type: string;

  @Field(type => UserProfile)
  @OneToOne(type => UserProfile)
  @JoinColumn()
  profile: UserProfile;

  // :TODO enum으로 수정?
  // @Column()
  // @Field(type => String)
  // status: string;

  @Field(type => Date)
  @CreateDateColumn({ type: 'timestamp'})
  created_at: string;

  @Field(type => Date)
  @UpdateDateColumn({type: "timestamp"})
  updatedAt: Date;

}
