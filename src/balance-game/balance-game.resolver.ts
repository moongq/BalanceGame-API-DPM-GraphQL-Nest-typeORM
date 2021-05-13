import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { BalanceGameService } from "./balance-game.service";
import { BalanceGame } from "./balance-game.model";
import { CreateBalanceGameInput } from "./dto/create-balance-game.input";
import { UpdateBalanceGameInput } from "./dto/update-balance-game.input";
import { FileUpload, GraphQLUpload } from "graphql-upload";
import { FileService } from "../file/file.service";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "../user/auth.guard";

@Resolver(() => BalanceGame)
export class BalanceGameResolver {
  constructor(
    private readonly balanceGameService: BalanceGameService,
    private fileService: FileService
  ) {}

  // :TODO 미들웨어 추가 [로그인 / ]
  @Mutation(() => BalanceGame)
  // @UseGuards(new AuthGuard())
  async createBalanceGame(
    @Args("createBalanceGameInput") createBalanceGameInput: CreateBalanceGameInput
  ): Promise<BalanceGame> {
    return await this.balanceGameService.create(createBalanceGameInput);
  }

  @Mutation(() => Boolean)
  async uploadFile(@Args({name: 'file1', type: () => GraphQLUpload})
    file1: FileUpload,
  ) {
      const result = await this.fileService.uploadFile(file1);
      return result;
  }

  // 검색 정렬: [ 최신순 / 인기순 ]
  // 검색 기준: [ 카테고리 / ]
  @Query(() => [BalanceGame], { name: "balanceGames" })
  async findAll(): Promise<BalanceGame[]> {
    const balanceGames = await this.balanceGameService.findAll();

    console.log(balanceGames);
    return balanceGames;
  }

  @Query(() => BalanceGame, { name: "balanceGame" })
  async findOne(@Args("id") id: string): Promise<BalanceGame> {
    const result = await this.balanceGameService.findOne(id);
    console.log(result)
    return result;
  }

  // :TODO 미들웨어 추가 [로그인, 내 게임인지 여부, 게임 ID가 유효한지.]
  @Mutation(() => BalanceGame)
  // @UseGuards(new AuthGuard())
  async updateBalanceGame(
    @Args("id") id: string,
    @Args("updateBalanceGameInput") updateBalanceGameInput: UpdateBalanceGameInput
  ) {
    return await this.balanceGameService.update(id, updateBalanceGameInput);
  }

  // :TODO 미들웨어 추가 [로그인, 내 게임인지 여부, 게임 ID가 유효한지.]
  @Mutation(() => Boolean)
  // @UseGuards(new AuthGuard())
  async removeBalanceGame(@Args("id", { type: () => String }) id: string): Promise<Boolean> {
    return await this.balanceGameService.remove(id);
  }
}
