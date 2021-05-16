import { Module } from "@nestjs/common";
import { CommentService } from "./comment.service";
import { CommentResolver } from "./comment.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Comment } from "./comment.model";
import { BalanceGameSelectionVoteModule } from "../balance-game-selection-vote/balance-game-selection-vote.module";
import { BalanceGameSelectionVoteService } from "../balance-game-selection-vote/balance-game-selection-vote.service";

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), BalanceGameSelectionVoteModule],
  providers: [CommentResolver, CommentService],
  exports: [],
})
export class CommentModule {}
