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
import { BalanceGameSelectionVote } from "../balance-game-selection-vote/balance-game-selection-vote.model";
import { BalanceGame } from "../balance-game/balance-game.model";
import { User } from "../user/user.model";

@ObjectType()
@Entity()
export class BalanceGameSelection {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne((type) => BalanceGame, (balanceGame) => balanceGame.balanceGameSelections, { onDelete: "CASCADE" })
  @JoinColumn({ name: "balanceGameId" })
  balanceGame: BalanceGame;

  @Field()
  @Column()
  balanceGameId: string;

  @OneToMany(
    (type) => BalanceGameSelectionVote,
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
  subText: string;

  @Field()
  @Column()
  backgroundColor: string;

  @Field()
  @Column()
  backgroundImage: string;

  @Field()
  @Column()
  order: number;

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
