import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";

import { BalanceGameSelection } from "./balance-game-selection.model";
import { BalanceGameSelectionService } from "./balance-game-selection.service";

import { CreateBalanceGameSelectionInput } from "./dto/create-balance-game-selection.input";

@Resolver(() => BalanceGameSelection)
export class BalanceGameSelectionResolver {
  constructor(private readonly balanceGameSelectionService: BalanceGameSelectionService) {}

  @Mutation(() => BalanceGameSelection)
  async createBalanceGameSelection(
    @Args("createBalanceGameSelectionInput") createBalanceGameSelectionInput: CreateBalanceGameSelectionInput
  ): Promise<BalanceGameSelection> {
    return await this.balanceGameSelectionService.create(createBalanceGameSelectionInput);
  }

  @Query(() => [BalanceGameSelection], { name: "balanceGameSelection" })
  findAll() {
    return this.balanceGameSelectionService.findAll();
  }

  @Query(() => BalanceGameSelection, { name: "balanceGameSelection" })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.balanceGameSelectionService.findOne(id);
  }

  // @Mutation(() => BalanceGameSelection)
  // updateBalanceGameSelection(@Args('updateBalanceGameSelectionInput') updateBalanceGameSelectionInput: UpdateBalanceGameSelectionInput) {
  //   return this.balanceGameSelectionService.update(updateBalanceGameSelectionInput.id, updateBalanceGameSelectionInput);
  // }

  // @Mutation(() => BalanceGameSelection)
  // removeBalanceGameSelection(@Args('id', { type: () => Int }) id: number) {
  //   return this.balanceGameSelectionService.remove(id);
  // }
}
