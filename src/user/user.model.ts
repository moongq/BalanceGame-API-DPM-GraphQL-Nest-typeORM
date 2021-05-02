import { ObjectType, Field, ID } from "@nestjs/graphql";
import { UserProfileService } from "../user-profile/user-profile.service";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
} from "typeorm";
import { UserProfile } from "../user-profile/user-profile.model";
import { BalanceGame } from "../balance-game/balance-game.model";

@ObjectType()
@Entity()
export class User {
  @Field()
  @PrimaryGeneratedColumn("uuid")
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

  @OneToMany((type) => BalanceGame, (balanceGame) => balanceGame.user)
  balanceGames: BalanceGame[];

  // :TODO enum으로 수정?
  // @Column()
  // @Field(type => String)
  // status: string;

  @Field((type) => Date)
  @CreateDateColumn({ type: "timestamp" })
  createdAt: string;

  @Field((type) => Date)
  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;
}
