import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { BalanceGameService } from "./balance-game.service";
import { BalanceGame } from "./balance-game.model";
import { CreateBalanceGameInput } from "./dto/create-balance-game.input";
import { UpdateBalanceGameInput } from "./dto/update-balance-game.input";

@Resolver(() => BalanceGame)
export class BalanceGameResolver {
  constructor(private readonly balanceGameService: BalanceGameService) {}

  @Mutation(() => BalanceGame)
  async createBalanceGame(
    @Args("createBalanceGameInput") createBalanceGameInput: CreateBalanceGameInput
  ): Promise<BalanceGame> {
    return await this.balanceGameService.create(createBalanceGameInput);
  }

  @Query(() => [BalanceGame], { name: "balanceGames" })
  async findAll(): Promise<BalanceGame[]> {
    const balanceGames = await this.balanceGameService.findAll();

    console.log(balanceGames);
    return balanceGames;
  }

  // @Query(() => BalanceGame, { name: "balanceGame" })
  // findOne(@Args("id", { type: () => Int }) id: number) {
  //   return this.balanceGameService.findOne(id);
  // }

  // @Mutation(() => BalanceGame)
  // updateBalanceGame(@Args("updateBalanceGameInput") updateBalanceGameInput: UpdateBalanceGameInput) {
  //   return this.balanceGameService.update(updateBalanceGameInput.id, updateBalanceGameInput);
  // }

  // @Mutation(() => BalanceGame)
  // removeBalanceGame(@Args("id", { type: () => Int }) id: number) {
  //   return this.balanceGameService.remove(id);
  // }
}
