import { ObjectType, Field, Int } from "@nestjs/graphql";
import { BalanceGame } from "src/balance-game/balance-game.model";
import { User } from "src/user/user.model";
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

@ObjectType()
@Entity()
export class Notification {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne((type) => User, (user) => user.notifications, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userForId" })
  user: User;

  @Field(() => String)
  @Column({ nullable: true })
  userForId: string;

  @Field(() => String)
  @Column()
  userFromId: string;

  @ManyToOne((type) => BalanceGame, (balanceGame) => balanceGame.notifications)
  @JoinColumn({ name: "balanceGameId" })
  balanceGame: BalanceGame;

  @Field()
  @Column()
  balanceGameId: string;

  @ManyToOne((type) => Comment, (comment) => comment.notifications)
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

  @Field((type) => String)
  @Column()
  status: string;

  @Field((type) => Date)
  @CreateDateColumn({ type: "timestamp" })
  createdAt: string;

  @Field((type) => Date)
  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;
}