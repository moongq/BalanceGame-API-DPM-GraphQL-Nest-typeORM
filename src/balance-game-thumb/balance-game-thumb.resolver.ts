import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { BalanceGameThumbService } from "./balance-game-thumb.service";
import { BalanceGameThumb } from "./balance-game-thumb.model";
import { CreateBalanceGameThumbInput } from "./dto/create-balance-game-thumb.input";
import { UpdateBalanceGameThumbInput } from "./dto/update-balance-game-thumb.input";

@Resolver(() => BalanceGameThumb)
export class BalanceGameThumbResolver {
  constructor(private readonly balanceGameThumbService: BalanceGameThumbService) {}

  @Mutation(() => BalanceGameThumb)
  async createBalanceGameThumb(
    @Args("createBalanceGameThumbInput") createBalanceGameThumbInput: CreateBalanceGameThumbInput
  ) {
    return await this.balanceGameThumbService.create(createBalanceGameThumbInput);
  }

  @Query(() => [BalanceGameThumb], { name: "balanceGameThumbs" })
  async findAll() {
    return await this.balanceGameThumbService.findAll();
  }

  @Query(() => BalanceGameThumb, { name: "balanceGameThumb" })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.balanceGameThumbService.findOne(id);
  }

  // @Mutation(() => BalanceGameThumb)
  // updateBalanceGameThumb(@Args('updateBalanceGameThumbInput') updateBalanceGameThumbInput: UpdateBalanceGameThumbInput) {
  //   return this.balanceGameThumbService.update(updateBalanceGameThumbInput.id, updateBalanceGameThumbInput);
  // }

  // @Mutation(() => BalanceGameThumb)
  // removeBalanceGameThumb(@Args('id', { type: () => Int }) id: number) {
  //   return this.balanceGameThumbService.remove(id);
  // }
}
