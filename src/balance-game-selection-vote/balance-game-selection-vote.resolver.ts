import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { BalanceGameSelectionVoteService } from "./balance-game-selection-vote.service";
import { BalanceGameSelectionVote } from "./balance-game-selection-vote.model";
import { CreateBalanceGameSelectionVoteInput } from "./dto/create-balance-game-selection-vote.input";
import { UpdateBalanceGameSelectionVoteInput } from "./dto/update-balance-game-selection-vote.input";
import { Token } from "../user/lib/user.decorator";
import { UserJwt } from "../user/dto/user-jwt";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "../user/auth.guard";

@Resolver(() => BalanceGameSelectionVote)
export class BalanceGameSelectionVoteResolver {
  constructor(private readonly balanceGameSelectionVoteService: BalanceGameSelectionVoteService) {}

  @Mutation(() => BalanceGameSelectionVote)
  @UseGuards(new AuthGuard())
  async createBalanceGameSelectionVote(
    @Token("user") token: UserJwt,
    @Args("createBalanceGameSelectionVoteInput")
    createBalanceGameSelectionVoteInput: CreateBalanceGameSelectionVoteInput
  ): Promise<BalanceGameSelectionVote> {
    return await this.balanceGameSelectionVoteService.create(token.userId, createBalanceGameSelectionVoteInput);
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

  // @Mutation(() => BalanceGameSelectionVote)
  // removeBalanceGameSelectionVote(@Args("id", { type: () => Int }) id: number) {
  //   return this.balanceGameSelectionVoteService.remove(id);
  // }
}
