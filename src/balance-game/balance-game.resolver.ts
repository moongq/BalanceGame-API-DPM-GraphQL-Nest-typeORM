import { FileUpload, GraphQLUpload } from "graphql-upload";
import { UseGuards } from "@nestjs/common";
import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";

import { BalanceGameService } from "./balance-game.service";
import { BalanceGame } from "./balance-game.model";
import { BalanceGameList } from "./dto/balance-game-list.output";
import { BalanceGamesStateInput } from "./dto/balance-game-state.input";

import { CreateBalanceGameInput } from "./dto/create-balance-game.input";
import { UpdateBalanceGameInput } from "./dto/update-balance-game.input";

import { FileService } from "../file/file.service";
import { AuthGuard } from "../user/guards/auth.guard";
import { UserJwt } from "../user/dto/user-jwt";
import { Token } from "../user/lib/user.decorator";
import { CheckLoginOrNot } from "../user/guards/checkLoginedOrNot.guard";

@Resolver(() => BalanceGame)
export class BalanceGameResolver {
  constructor(private readonly balanceGameService: BalanceGameService, private fileService: FileService) {}

  // :TODO 미들웨어 추가 [로그인 / ]
  // UseGuards를 미들웨어로 빼는 작업 진행
  @Mutation(() => BalanceGame)
  @UseGuards(new AuthGuard())
  async createBalanceGame(
    @Token("user") token: UserJwt,
    @Args("createBalanceGameInput") createBalanceGameInput: CreateBalanceGameInput
  ): Promise<BalanceGame> {
    return await this.balanceGameService.create(token.userId, createBalanceGameInput);
  }

  @Mutation(() => Boolean)
  async uploadFile(
    @Args({ name: "file1", type: () => GraphQLUpload })
    file1: FileUpload
  ) {
    const result = await this.fileService.uploadFile(file1);
    return result;
  }

  // 검색 정렬: [ 최신순 / 인기순 ]
  // 검색 기준: [ 카테고리 / ]
  @Query(() => BalanceGameList, { name: "balanceGames", description: "밸런스 게임 list 형태로 return" })
  async findAll(
    @Args("balanceGamesState", { nullable: true }) balanceGamesState: BalanceGamesStateInput
  ): Promise<BalanceGameList> {
    const limit = balanceGamesState?.limit;
    const offset = balanceGamesState?.offset;
    const balanceGames = await this.balanceGameService.findAll(limit, offset);

    return balanceGames;
  }

  @Query(() => [BalanceGame], { name: "balanceGamesTEST" })
  async findAllTEST(): Promise<BalanceGame[]> {
    const balanceGames = await this.balanceGameService.findAll();

    console.log(balanceGames);
    return balanceGames.balanceGame;
  }

  @Query(() => BalanceGame, { name: "balanceGame" })
  @UseGuards(new CheckLoginOrNot())
  async findOne(@Token("user") token: UserJwt, @Args("id") id: string): Promise<BalanceGame> {
    const result = await this.balanceGameService.findOne(token.userId, id);
    return result;
  }

  // :TODO 미들웨어 추가 [로그인, 내 게임인지 여부, 게임 ID가 유효한지.]
  @Mutation(() => BalanceGame)
  @UseGuards(new AuthGuard())
  async updateBalanceGame(
    @Args("updateBalanceGameInput") updateBalanceGameInput: UpdateBalanceGameInput,
    @Token("user") token: UserJwt
  ) {
    return await this.balanceGameService.update(updateBalanceGameInput, token.userId);
  }

  // :TODO 미들웨어 추가 [로그인, 내 게임인지 여부(service에 넣어둠.), 게임 ID가 유효한지.]
  @Mutation(() => Boolean)
  @UseGuards(new AuthGuard())
  async removeBalanceGame(
    @Args("id", { type: () => String }) id: string,
    @Token("user") token: UserJwt
  ): Promise<boolean> {
    return await this.balanceGameService.remove(id, token.userId);
  }
}
