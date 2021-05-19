import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { BalanceGameThumb } from "./balance-game-thumb.model";
import { BalanceGameThumbResolver } from "./balance-game-thumb.resolver";
import { BalanceGameThumbService } from "./balance-game-thumb.service";

@Module({
  imports: [TypeOrmModule.forFeature([BalanceGameThumb])],
  providers: [BalanceGameThumbResolver, BalanceGameThumbService],
})
export class BalanceGameThumbModule {}
