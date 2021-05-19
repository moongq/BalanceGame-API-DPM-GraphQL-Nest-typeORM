import { ObjectType, Field } from "@nestjs/graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { Comment } from "../comment/comment.model";
import { User } from "../user/user.model";
import { BalanceGame } from "../balance-game/balance-game.model";

@ObjectType()
@Entity()
export class Notification {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User, (user) => user.notifications, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userForId" })
  user: User;

  @Field(() => String)
  @Column({ nullable: true })
  userForId: string;

  @Field(() => String)
  @Column()
  userFromId: string;

  @ManyToOne(() => BalanceGame, (balanceGame) => balanceGame.notifications)
  @JoinColumn({ name: "balanceGameId" })
  balanceGame: BalanceGame;

  @Field()
  @Column()
  balanceGameId: string;

  @ManyToOne(() => Comment, (comment) => comment.notifications)
  @JoinColumn({ name: "commentId" })
  comment: Comment;

  @Field()
  @Column()
  commentId: string;

  @Field(() => String)
  @Column()
  content: string;

  @Field(() => String)
  @Column({ nullable: true })
  replyNickname: string;

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
