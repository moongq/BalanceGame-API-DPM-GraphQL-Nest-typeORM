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
import { BalanceGameSelection } from "../balance-game-selection/balance-game-selection.model";
import { User } from "../user/user.model";

@ObjectType()
@Entity()
export class BalanceGameSelectionVote {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User, (user) => user.balanceGameSelectionVotes)
  @JoinColumn({ name: "userId" })
  user?: User;

  @Field()
  @Column({ nullable: true })
  userId?: string;

  @ManyToOne(() => BalanceGame, (balanceGame) => balanceGame.balanceGameSelectionVotes, { onDelete: "CASCADE" })
  @JoinColumn({ name: "balanceGameId" })
  balanceGame: BalanceGame;

  @Field()
  @Column()
  balanceGameId: string;

  @ManyToOne(() => BalanceGameSelection, (balanceGameSelection) => balanceGameSelection.balanceGameSelectionVotes, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "balanceGameSelectionId" })
  balanceGameSelection: BalanceGameSelection;

  @Field()
  @Column()
  balanceGameSelectionId: string;

  @Field()
  @Column()
  voteCount: number;

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

// Count after insert/delete 구현하기.
