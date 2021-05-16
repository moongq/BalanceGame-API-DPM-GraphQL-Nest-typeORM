import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { BalanceGameSelectionVoteService } from "./balance-game-selection-vote.service";
import { BalanceGameSelectionVote } from "./balance-game-selection-vote.model";
import { CreateBalanceGameSelectionVoteInput } from "./dto/create-balance-game-selection-vote.input";
import { UpdateBalanceGameSelectionVoteInput } from "./dto/update-balance-game-selection-vote.input";
import { Token } from "../user/lib/user.decorator";
import { UserJwt } from "../user/dto/user-jwt";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "../user/auth.guard";
import { BalanceGame } from "../balance-game/balance-game.model";

@Resolver(() => BalanceGameSelectionVote)
export class BalanceGameSelectionVoteResolver {
  constructor(private readonly balanceGameSelectionVoteService: BalanceGameSelectionVoteService) {}

  @Mutation(() => BalanceGame)
  @UseGuards(new AuthGuard())
  async createBalanceGameSelectionVoteLogined(
    @Token("user") token: UserJwt,
    @Args("createBalanceGameSelectionVoteInput")
    createBalanceGameSelectionVoteInput: CreateBalanceGameSelectionVoteInput
  ): Promise<BalanceGame> {
    const result = await this.balanceGameSelectionVoteService.createLogined(
      token.userId,
      createBalanceGameSelectionVoteInput
    );
    return result;
  }

  @Query(() => [BalanceGameSelectionVote], { name: "balanceGameSelectionVotes" })
  async findAll() {
    return await this.balanceGameSelectionVoteService.findAll();
  }

  @Query(() => BalanceGameSelectionVote, { name: "balanceGameSelectionVote" })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.balanceGameSelectionVoteService.findOne(id);
  }

  // update
  // 업데이트는 없고 취소하고 다른 거 생성하는 것임.
  // 다른 것 투표하기.

  // @Mutation(() => Boolean)
  // @UseGuards(new AuthGuard())
  // async removeBalanceGame(
  //   @Args("id", { type: () => String }) id: string,
  //   @Token("user") token: UserJwt
  // ): Promise<Boolean> {
  //   return await this.balanceGameService.remove(id, token.userId);
  // }

  @Mutation(() => Boolean)
  @UseGuards(new AuthGuard())
  async removeBalanceGameSelectionVoteLogined(
    @Args("balanceGameId", { type: () => String }) balanceGameId: string,
    @Token("user") token: UserJwt
  ): Promise<boolean> {
    return await this.balanceGameSelectionVoteService.removeLogined(balanceGameId, token.userId);
  }
}
