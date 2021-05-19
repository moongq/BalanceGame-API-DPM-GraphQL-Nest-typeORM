import { ObjectType, Field, Int } from "@nestjs/graphql";
import {
  AfterInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { BalanceGameSelection } from "../balance-game-selection/balance-game-selection.model";
import { BalanceGame } from "../balance-game/balance-game.model";
import { User } from "../user/user.model";

@ObjectType()
@Entity()
export class BalanceGameSelectionVote {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne((type) => User, (user) => user.balanceGameSelectionVotes)
  @JoinColumn({ name: "userId" })
  user?: User;

  @Field()
  @Column({ nullable: true })
  userId?: string;

  @ManyToOne((type) => BalanceGame, (balanceGame) => balanceGame.balanceGameSelectionVotes, { onDelete: "CASCADE" })
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

// Count after insert/delete 구현하기.
