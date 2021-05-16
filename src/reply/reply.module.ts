import { Module } from "@nestjs/common";
import { ReplyService } from "./reply.service";
import { ReplyResolver } from "./reply.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Reply } from "./reply.model";
import { BalanceGameSelectionVoteModule } from "../balance-game-selection-vote/balance-game-selection-vote.module";

@Module({
  imports: [TypeOrmModule.forFeature([Reply]), BalanceGameSelectionVoteModule],
  providers: [ReplyResolver, ReplyService],
})
export class ReplyModule {}
