import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { BalanceGameSelection } from "./balance-game-selection.model";
import { BalanceGameSelectionResolver } from "./balance-game-selection.resolver";
import { BalanceGameSelectionService } from "./balance-game-selection.service";

import { BalanceGame } from "../balance-game/balance-game.model";
import { User } from "../user/user.model";

@Module({
  imports: [TypeOrmModule.forFeature([BalanceGameSelection, BalanceGame, User])],
  providers: [BalanceGameSelectionResolver, BalanceGameSelectionService],
  exports: [BalanceGameSelectionService],
})
export class BalanceGameSelectionModule {}
