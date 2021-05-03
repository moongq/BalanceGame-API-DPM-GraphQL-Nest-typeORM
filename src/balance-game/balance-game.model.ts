import { ObjectType, Field, ID, Int } from "@nestjs/graphql";
import { User } from "../user/user.model";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  RelationId,
  OneToMany,
} from "typeorm";
import { BalanceGameSelection } from "../balance-game-selection/balance-game-selection.model";
import { BalanceGameSelectionVote } from "../balance-game-selection-vote/balance-game-selection-vote.model";

@ObjectType()
@Entity()
export class BalanceGame {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne((type) => User, (user) => user.balanceGames)
  @JoinColumn({ name: "userId" })
  user: User; // userId

  @Field()
  @Column()
  userId: string;

  @OneToMany((type) => BalanceGameSelection, (balanceGameSelection) => balanceGameSelection.balanceGame)
  balanceGameSelections: BalanceGameSelection[];

  @OneToMany(
    (type) => BalanceGameSelectionVote,
    (balanceGameSelectionVote) => balanceGameSelectionVote.balanceGameSelection
  )
  balanceGameSelectionVotes: BalanceGameSelectionVote;

  @Field((type) => String)
  @Column()
  description: string;

  @Field((type) => Int)
  @Column()
  voteCount: number;

  @Field((type) => Int)
  @Column()
  thumbsUp: number;

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
