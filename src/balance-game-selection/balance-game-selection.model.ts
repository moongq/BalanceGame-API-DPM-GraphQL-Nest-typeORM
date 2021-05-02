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
import { BalanceGame } from "../balance-game/balance-game.model";
import { User } from "../user/user.model";

@ObjectType()
@Entity()
export class BalanceGameSelection {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne((type) => BalanceGame, (balanceGame) => balanceGame.balanceGameSelections)
  @JoinColumn({ name: "balanceGameId" })
  balanceGame: BalanceGame;

  @Field()
  @Column()
  balanceGameId: string;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  titleColor: string;

  @Field()
  @Column()
  backgroundColor: string;

  @Field()
  @Column()
  backgroundImage: string;

  @Field()
  @Column()
  order: string;

  @Field()
  @Column()
  voteCount: number;

  @Field()
  @Column()
  status: string;

  @Field((type) => Date)
  @CreateDateColumn({ type: "timestamp" })
  createdAt: string;

  @Field((type) => Date)
  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;
}
