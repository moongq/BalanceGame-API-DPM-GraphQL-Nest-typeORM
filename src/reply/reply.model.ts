import { ObjectType, Field, Int } from "@nestjs/graphql";
import { BalanceGame } from "../balance-game/balance-game.model";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../user/user.model";
import { Comment } from "../comment/comment.model";

@ObjectType()
@Entity()
export class Reply {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne((type) => User, (user) => user.comments)
  @JoinColumn({ name: "userId" })
  user: User; // userId

  @Field(() => String)
  @Column()
  userId: string;

  @ManyToOne((type) => BalanceGame, (balanceGame) => balanceGame.comments, { onDelete: "CASCADE" })
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

  @Field(() => String)
  @Column()
  content: string;

  @Field((type) => String)
  @Column()
  status: string;

  @Field((type) => Date)
  @CreateDateColumn({ type: "timestamp" })
  createdAt: string;

  @Field((type) => Date)
  @CreateDateColumn({ type: "timestamp" })
  updatedAt: Date;
}