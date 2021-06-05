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
import { Reply } from "../reply/reply.model";

@ObjectType()
@Entity()
export class Notification {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field(() => String, { description: "new comment || new reply" })
  @Column()
  kind: string;

  @ManyToOne(() => BalanceGame, (balanceGame) => balanceGame.notifications)
  @JoinColumn({ name: "balanceGameId" })
  balanceGame: BalanceGame;

  @Field()
  @Column()
  balanceGameId: string;

  @ManyToOne(() => User, (user) => user.notifications, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userForId" })
  user: User;

  @Field(() => String)
  @Column({ nullable: true })
  userForId: string;

  @Field(() => String)
  @Column()
  userFromId: string;

  @Field(() => String)
  @Column()
  userFromNickname: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  color: string;

  @ManyToOne(() => Comment, (comment) => comment.notifications, { nullable: true })
  @JoinColumn({ name: "commentId" })
  comment: Comment;

  @Field({ nullable: true })
  @Column({ nullable: true })
  commentId: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  commentContent: string;

  @ManyToOne(() => Reply, (reply) => reply.notifications, { nullable: true })
  @JoinColumn({ name: "replyId" })
  reply: Reply;

  @Field({ nullable: true })
  @Column({ nullable: true })
  replyId: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  replyContent: string;

  @Field(() => String, { description: " unread || red" })
  @Column({ default: "unread" })
  status: string;

  @Field(() => Date)
  @CreateDateColumn({ type: "timestamp" })
  createdAt: string;
}
