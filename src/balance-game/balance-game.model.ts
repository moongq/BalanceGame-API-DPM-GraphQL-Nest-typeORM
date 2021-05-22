import { ObjectType, Field, Int } from "@nestjs/graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { BalanceGameKeyword } from "../balance-game-keyword/balance-game-keyword.model";
import { BalanceGameThumb } from "../balance-game-thumb/balance-game-thumb.model";
import { BalanceGameSelection } from "../balance-game-selection/balance-game-selection.model";
import { BalanceGameSelectionVote } from "../balance-game-selection-vote/balance-game-selection-vote.model";
import { Comment } from "../comment/comment.model";
import { Notification } from "../notification/notification.model";
import { User } from "../user/user.model";

@ObjectType()
@Entity()
export class BalanceGame {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User, (user) => user.balanceGames)
  @JoinColumn({ name: "userId" })
  user: User; // userId

  @Field()
  @Column()
  userId: string;

  @OneToMany(() => BalanceGameSelection, (balanceGameSelection) => balanceGameSelection.balanceGame)
  balanceGameSelections: BalanceGameSelection[];

  @OneToMany(() => BalanceGameSelectionVote, (balanceGameSelectionVote) => balanceGameSelectionVote.balanceGame)
  balanceGameSelectionVotes: BalanceGameSelectionVote[];

  @Field(() => Number)
  @Column({ default: 0 })
  balanceGameSelectionVotesCount: number;

  @OneToMany(() => BalanceGameThumb, (balanceGameThumb) => balanceGameThumb.balanceGame)
  balanceGameThumbs: BalanceGameThumb[];

  @OneToMany(() => BalanceGameKeyword, (balanceGameKeyword) => balanceGameKeyword.balanceGame)
  balanceGameKeywords: BalanceGameKeyword[];

  @OneToMany(() => Notification, (notification) => notification.balanceGame)
  notifications: Notification[];

  @OneToMany(() => Comment, (comment) => comment.balanceGame)
  comments: Comment[];

  @Field(() => String)
  @Column()
  description: string;

  @Field(() => Int)
  @Column({ default: 0 })
  totalVoteCount: number;

  @Field(() => Int)
  @Column({ default: 0 })
  commentCount: number;

  @Field(() => Int)
  @Column({ default: 0 })
  thumbs: number;

  @Field(() => String)
  @Column()
  status: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  mySelection: string;

  @Field(() => Date)
  @CreateDateColumn({ type: "timestamp" })
  createdAt: string;

  @Field(() => Date)
  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;
}
