import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { BalanceGameSelectionVoteService } from "./balance-game-selection-vote.service";
import { BalanceGameSelectionVote } from "./balance-game-selection-vote.model";
import { CreateBalanceGameSelectionVoteInput } from "./dto/create-balance-game-selection-vote.input";
import { UpdateBalanceGameSelectionVoteInput } from "./dto/update-balance-game-selection-vote.input";

@Resolver(() => BalanceGameSelectionVote)
export class BalanceGameSelectionVoteResolver {
  constructor(private readonly balanceGameSelectionVoteService: BalanceGameSelectionVoteService) {}

  @Mutation(() => BalanceGameSelectionVote)
  async createBalanceGameSelectionVote(
    @Args("createBalanceGameSelectionVoteInput")
    createBalanceGameSelectionVoteInput: CreateBalanceGameSelectionVoteInput
  ) {
    return await this.balanceGameSelectionVoteService.create(createBalanceGameSelectionVoteInput);
  }

  @Query(() => [BalanceGameSelectionVote], { name: "balanceGameSelectionVotes" })
  async findAll() {
    return await this.balanceGameSelectionVoteService.findAll();
  }

  @Query(() => BalanceGameSelectionVote, { name: "balanceGameSelectionVote" })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.balanceGameSelectionVoteService.findOne(id);
  }

  // @Mutation(() => BalanceGameSelectionVote)
  // updateBalanceGameSelectionVote(
  //   @Args("updateBalanceGameSelectionVoteInput")
  //   updateBalanceGameSelectionVoteInput: UpdateBalanceGameSelectionVoteInput
  // ) {
  //   return this.balanceGameSelectionVoteService.update(
  //     updateBalanceGameSelectionVoteInput.id,
  //     updateBalanceGameSelectionVoteInput
  //   );
  // }

  // @Mutation(() => BalanceGameSelectionVote)
  // removeBalanceGameSelectionVote(@Args("id", { type: () => Int }) id: number) {
  //   return this.balanceGameSelectionVoteService.remove(id);
  // }
}
