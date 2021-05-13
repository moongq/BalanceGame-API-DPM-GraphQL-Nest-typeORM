import { Module } from "@nestjs/common";
import { BalanceGameService } from "./balance-game.service";
import { BalanceGameResolver } from "./balance-game.resolver";
import { BalanceGame } from "./balance-game.model";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "../user/user.module";
import { User } from "../user/user.model";
import { BalanceGameKeywordModule } from "../balance-game-keyword/balance-game-keyword.module";
import { BalanceGameSelectionModule } from "../balance-game-selection/balance-game-selection.module";
import { FileModule } from "src/file/file.module";

@Module({
  imports: [TypeOrmModule.forFeature([BalanceGame, User]), BalanceGameKeywordModule, BalanceGameSelectionModule, FileModule],
  providers: [BalanceGameResolver, BalanceGameService],
  exports: [BalanceGameService],
})
export class BalanceGameModule {}
