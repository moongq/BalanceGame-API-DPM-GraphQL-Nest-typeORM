import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { BalanceGame } from "./balance-game.model";
import { BalanceGameResolver } from "./balance-game.resolver";
import { BalanceGameService } from "./balance-game.service";

import { BalanceGameKeywordModule } from "../balance-game-keyword/balance-game-keyword.module";
import { BalanceGameSelectionModule } from "../balance-game-selection/balance-game-selection.module";
import { BalanceGameSelectionVoteModule } from "../balance-game-selection-vote/balance-game-selection-vote.module";

import { FileModule } from "../file/file.module";
import { User } from "../user/user.model";

@Module({
  imports: [
    TypeOrmModule.forFeature([BalanceGame, User]),
    BalanceGameKeywordModule,
    BalanceGameSelectionModule,
    BalanceGameSelectionVoteModule,
    FileModule,
  ],
  providers: [BalanceGameResolver, BalanceGameService],
  exports: [BalanceGameService],
})
export class BalanceGameModule {}
