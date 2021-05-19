import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { BalanceGameSelectionVote } from "./balance-game-selection-vote.model";
import { BalanceGameSelectionVoteResolver } from "./balance-game-selection-vote.resolver";
import { BalanceGameSelectionVoteService } from "./balance-game-selection-vote.service";

import { BalanceGame } from "../balance-game/balance-game.model";
import { BalanceGameSelection } from "../balance-game-selection/balance-game-selection.model";

@Module({
  imports: [TypeOrmModule.forFeature([BalanceGameSelectionVote, BalanceGame, BalanceGameSelection])],
  providers: [BalanceGameSelectionVoteResolver, BalanceGameSelectionVoteService],
  exports: [BalanceGameSelectionVoteService],
})
export class BalanceGameSelectionVoteModule {}
