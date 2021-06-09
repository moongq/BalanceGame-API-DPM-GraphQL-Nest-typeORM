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

@ObjectType()
@Entity()
export class BalanceGameKeyword {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column()
  name: string;

  @ManyToOne(() => BalanceGame, (balanceGame) => balanceGame.balanceGameKeywords)
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
