import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { BalanceGameKeywordService } from "./balance-game-keyword.service";
import { BalanceGameKeyword } from "./balance-game-keyword.model";
import { CreateBalanceGameKeywordInput } from "./dto/create-balance-game-keyword.input";
import { UpdateBalanceGameKeywordInput } from "./dto/update-balance-game-keyword.input";

@Resolver(() => BalanceGameKeyword)
export class BalanceGameKeywordResolver {
  constructor(private readonly balanceGameKeywordService: BalanceGameKeywordService) {}

  @Mutation(() => BalanceGameKeyword)
  async createBalanceGameKeyword(
    @Args("createBalanceGameKeywordInput") createBalanceGameKeywordInput: CreateBalanceGameKeywordInput
  ) {
    return await this.balanceGameKeywordService.create(createBalanceGameKeywordInput);
  }

  @Query(() => [BalanceGameKeyword], { name: "balanceGameKeywords" })
  async findAll() {
    return await this.balanceGameKeywordService.findAll();
  }

  @Query(() => BalanceGameKeyword, { name: "balanceGameKeyword" })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.balanceGameKeywordService.findOne(id);
  }

  // @Mutation(() => BalanceGameKeyword)
  // updateBalanceGameKeyword(@Args('updateBalanceGameKeywordInput') updateBalanceGameKeywordInput: UpdateBalanceGameKeywordInput) {
  //   return this.balanceGameKeywordService.update(updateBalanceGameKeywordInput.id, updateBalanceGameKeywordInput);
  // }

  // @Mutation(() => BalanceGameKeyword)
  // removeBalanceGameKeyword(@Args('id', { type: () => Int }) id: number) {
  //   return this.balanceGameKeywordService.remove(id);
  // }
}
