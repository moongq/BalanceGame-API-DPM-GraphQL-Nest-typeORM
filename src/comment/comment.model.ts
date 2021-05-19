import { ObjectType, Field, Int } from "@nestjs/graphql";
import { BalanceGame } from "../balance-game/balance-game.model";
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
import { User } from "../user/user.model";
import { Reply } from "src/reply/reply.model";
import { Notification } from "../notification/notification.model";

@ObjectType()
@Entity()
export class Comment {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne((type) => User, (user) => user.comments)
  @JoinColumn({ name: "userId" })
  user: User; // userId

  @Field(() => String)
  @Column()
  userId!: string;

  @ManyToOne((type) => BalanceGame, (balanceGame) => balanceGame.comments, { onDelete: "CASCADE" })
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
