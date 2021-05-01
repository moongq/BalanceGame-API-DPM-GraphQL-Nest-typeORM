import { ObjectType, Field, ID } from '@nestjs/graphql';
import { UserProfileService } from '../user-profile/user-profile.service';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { UserProfile } from '../user-profile/user-profile.model';

@ObjectType()
@Entity()
export class User {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field((type) => String)
  @Column()
  socialId: string;

  @Field((type) => String)
  @Column()
  platformType: string;

  @OneToOne((type) => UserProfile, (profile) => profile.user, { eager: true })
  @JoinColumn()
  profile: UserProfile;

  // :TODO enum으로 수정?
  // @Column()
  // @Field(type => String)
  // status: string;

  @Field((type) => Date)
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: string;

  @Field((type) => Date)
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
