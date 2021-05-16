import { Module } from "@nestjs/common";
import { BalanceGameSelectionVoteService } from "./balance-game-selection-vote.service";
import { BalanceGameSelectionVoteResolver } from "./balance-game-selection-vote.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BalanceGameSelectionVote } from "./balance-game-selection-vote.model";
import { BalanceGameModule } from "../balance-game/balance-game.module";
import { BalanceGame } from "../balance-game/balance-game.model";

@Module({
  imports: [TypeOrmModule.forFeature([BalanceGameSelectionVote, BalanceGame])],
  providers: [BalanceGameSelectionVoteResolver, BalanceGameSelectionVoteService],
  exports: [BalanceGameSelectionVoteService],
})
export class BalanceGameSelectionVoteModule {}
