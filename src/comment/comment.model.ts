import { ObjectType, Field } from "@nestjs/graphql";

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

import { BalanceGame } from "../balance-game/balance-game.model";
import { Notification } from "../notification/notification.model";
import { Reply } from "../reply/reply.model";
import { User } from "../user/user.model";

@ObjectType()
@Entity()
export class Comment {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({ name: "userId" })
  user: User; // userId

  @Field(() => String)
  @Column()
  userId!: string;

  @ManyToOne(() => BalanceGame, (balanceGame) => balanceGame.comments, { onDelete: "CASCADE" })
  @JoinColumn({ name: "balanceGameId" })
  balanceGame: BalanceGame;

  @Field()
  @Column()
  balanceGameId!: string;

  @Field()
  @Column()
  color?: string;

  @OneToMany(() => Reply, (reply) => reply.comment)
  replies: Reply[];

  @OneToMany(() => Notification, (notification) => notification.comment)
  notifications: Notification[];

  @Field(() => String)
  @Column()
  content!: string;

  @Field(() => String, {description: "delete 면 삭제된 댓글"})
  @Column()
  status: string;

  @Field(() => Date)
  @CreateDateColumn({ type: "timestamp" })
  createdAt: string;

  @Field(() => Date)
  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;
}
