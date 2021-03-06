import { ObjectType, Field } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { BalanceGame } from "../balance-game/balance-game.model";
import { Notification } from "../notification/notification.model";
import { Comment } from "../comment/comment.model";
import { User } from "../user/user.model";

@ObjectType()
@Entity()
export class Reply {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({ name: "userId" })
  user: User; // userId

  @Field(() => String)
  @Column()
  userId: string;

  @ManyToOne(() => BalanceGame, (balanceGame) => balanceGame.comments, { onDelete: "CASCADE" })
  @JoinColumn({ name: "balanceGameId" })
  balanceGame: BalanceGame;

  @Field()
  @Column()
  balanceGameId: string;

  @ManyToOne(() => Comment, (comment) => comment.replies, { onDelete: "CASCADE" })
  @JoinColumn({ name: "commentId" })
  comment: Comment;

  @Field()
  @Column()
  commentId: string;

  @Field()
  @Column({ nullable: true })
  color?: string;

  @Field(() => String)
  @Column()
  content: string;

  @Field(() => String, {description: "delete 면 삭제된 댓글"})
  @Column()
  status: string;

  @OneToMany(() => Notification, (notification) => notification.reply)
  notifications: Notification[];

  @Field(() => Date)
  @CreateDateColumn({ type: "timestamp" })
  createdAt: string;

  @Field(() => Date)
  @CreateDateColumn({ type: "timestamp" })
  updatedAt: Date;
}
