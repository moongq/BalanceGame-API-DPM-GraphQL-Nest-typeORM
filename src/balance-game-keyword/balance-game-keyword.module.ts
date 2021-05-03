import { Module } from "@nestjs/common";
import { BalanceGameKeywordService } from "./balance-game-keyword.service";
import { BalanceGameKeywordResolver } from "./balance-game-keyword.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BalanceGameKeyword } from "./balance-game-keyword.model";

@Module({
  imports: [TypeOrmModule.forFeature([BalanceGameKeyword])],
  providers: [BalanceGameKeywordResolver, BalanceGameKeywordService],
})
export class BalanceGameKeywordModule {}
