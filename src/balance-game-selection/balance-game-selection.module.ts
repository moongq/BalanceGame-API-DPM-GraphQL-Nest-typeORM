import { Module } from "@nestjs/common";
import { BalanceGameSelectionService } from "./balance-game-selection.service";
import { BalanceGameSelectionResolver } from "./balance-game-selection.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BalanceGame } from "../balance-game/balance-game.model";
import { User } from "../user/user.model";
import { BalanceGameSelection } from "./balance-game-selection.model";

@Module({
  imports: [TypeOrmModule.forFeature([BalanceGameSelection, BalanceGame, User])],
  providers: [BalanceGameSelectionResolver, BalanceGameSelectionService],
})
export class BalanceGameSelectionModule {}
