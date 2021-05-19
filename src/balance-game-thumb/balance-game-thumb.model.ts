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

import { BalanceGame } from "../balance-game/balance-game.model";
import { User } from "../user/user.model";

@ObjectType()
@Entity()
export class BalanceGameThumb {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User, (user) => user.balanceGameThumbs, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user: User; // userId

  @Field()
  @Column()
  userId: string;

  @ManyToOne(() => BalanceGame, (balanceGame) => balanceGame.balanceGameThumbs, { onDelete: "CASCADE" })
  @JoinColumn({ name: "balanceGameId" })
  balanceGame: BalanceGame;

  @Field()
  @Column()
  balanceGameId: string;

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
