import { Module } from "@nestjs/common";
import { BalanceGameThumbService } from "./balance-game-thumb.service";
import { BalanceGameThumbResolver } from "./balance-game-thumb.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BalanceGameThumb } from "./balance-game-thumb.model";

@Module({
  imports: [TypeOrmModule.forFeature([BalanceGameThumb])],
  providers: [BalanceGameThumbResolver, BalanceGameThumbService],
})
export class BalanceGameThumbModule {}
