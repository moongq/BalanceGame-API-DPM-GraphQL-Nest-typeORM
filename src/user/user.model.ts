import { ObjectType, Field } from "@nestjs/graphql";
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

import { BalanceGame } from "../balance-game/balance-game.model";
import { BalanceGameSelectionVote } from "../balance-game-selection-vote/balance-game-selection-vote.model";
import { BalanceGameThumb } from "../balance-game-thumb/balance-game-thumb.model";
import { Comment } from "../comment/comment.model";
import { Notification } from "../notification/notification.model";
import { Reply } from "../reply/reply.model";
import { UserProfile } from "../user-profile/user-profile.model";

@ObjectType()
@Entity()
export class User {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field(() => String)
  @Column()
  socialId: string;

  @Field(() => String)
  @Column()
  platformType: string;

  @OneToOne(() => UserProfile, (profile) => profile.user)
  @JoinColumn()
  profile: UserProfile;

  @OneToMany(() => BalanceGame, (balanceGame) => balanceGame.user)
  balanceGames: BalanceGame[];

  @OneToMany(() => BalanceGameSelectionVote, (balanceGameSelectionVote) => balanceGameSelectionVote.user)
  balanceGameSelectionVotes: BalanceGameSelectionVote[];

  @OneToMany(() => BalanceGameThumb, (balanceGameThumb) => balanceGameThumb.user)
  balanceGameThumbs: BalanceGameThumb[];

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany(() => Reply, (reply) => reply.user)
  replies: Reply[];

  // :TODO enum으로 수정?
  @Field(() => String)
  @Column()
  status: string;

  @Field(() => Date)
  @CreateDateColumn({ type: "timestamp" })
  createdAt: string;

  @Field(() => Date)
  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;
}
