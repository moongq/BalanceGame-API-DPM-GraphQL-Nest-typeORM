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
import { BalanceGameSelectionVote } from "../balance-game-selection-vote/balance-game-selection-vote.model";

enum order {
  test1 = 0,
  test2 = 1,
}

@ObjectType()
@Entity()
export class BalanceGameSelection {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => BalanceGame, (balanceGame) => balanceGame.balanceGameSelections, { onDelete: "CASCADE" })
  @JoinColumn({ name: "balanceGameId" })
  balanceGame: BalanceGame;

  @Field()
  @Column()
  balanceGameId: string;

  @OneToMany(
    () => BalanceGameSelectionVote,
    (balanceGameSelectionVote) => balanceGameSelectionVote.balanceGameSelection
  )
  balanceGameSelectionVotes: BalanceGameSelectionVote[];

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  textColor: string;

  @Field()
  @Column()
  backgroundColor: string;

  @Field()
  @Column()
  backgroundImage: string;

  @Field()
  @Column()
  order: order;

  @Field()
  @Column({ default: 0 })
  voteCount: number;

  @Field()
  @Column()
  status: string;

  @Field(() => Date)
  @CreateDateColumn({ type: "timestamp" })
  createdAt: string;

  @Field(() => Date)
  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;
}
