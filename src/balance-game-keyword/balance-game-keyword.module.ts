import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { BalanceGameKeyword } from "./balance-game-keyword.model";
import { BalanceGameKeywordResolver } from "./balance-game-keyword.resolver";
import { BalanceGameKeywordService } from "./balance-game-keyword.service";

@Module({
  imports: [TypeOrmModule.forFeature([BalanceGameKeyword])],
  providers: [BalanceGameKeywordResolver, BalanceGameKeywordService],
  exports: [BalanceGameKeywordService],
})
export class BalanceGameKeywordModule {}
