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

// 지울거
import { S3, S3Control, S3Outposts } from "aws-sdk";
// import { createWriteStream, createReadStream } from "fs";
import * as fs from "fs";
import { promisify } from "util";
////

@Resolver(() => BalanceGame)
export class BalanceGameResolver {
  constructor(private readonly balanceGameService: BalanceGameService, private fileService: FileService) {}

  // :TODO 미들웨어 추가 [로그인 / ]
  // UseGuards를 미들웨어로 빼는 작업 진행
  // @Mutation(() => BalanceGame)
  // @UseGuards(new AuthGuard())
  // async createBalanceGame(
  //   @Token("user") token: UserJwt,
  //   @Args("createBalanceGameInput") createBalanceGameInput: CreateBalanceGameInput
  // ): Promise<BalanceGame> {
  //   return await this.balanceGameService.create(token.userId, createBalanceGameInput);
  // }

  @Mutation(() => BalanceGame)
  @UseGuards(new AuthGuard())
  async createBalanceGame(
    @Token("user") token: UserJwt,
    @Args({ name: "file1", type: () => GraphQLUpload, nullable: true }) imageOfSelection0: FileUpload,
    @Args({ name: "file2", type: () => GraphQLUpload, nullable: true }) imageOfSelection1: FileUpload,
    @Args("createBalanceGameInput") createBalanceGameInput: CreateBalanceGameInput
  ): Promise<BalanceGame> {
    const s3Uploader = new S3({
      region: "ap-northeast-2",
      accessKeyId: `${process.env.AWS_S3_ACCESSKEY}`,
      secretAccessKey: `${process.env.AWS_S3_SECRET_ACCESSKEY}`,
    });

    let savedLocation0;
    let savedLocation1;

    if (imageOfSelection0 && imageOfSelection1) {
      const createReadStream0 = imageOfSelection0.createReadStream;
      const filename0 = imageOfSelection0.filename;
      let fileStream0 = createReadStream0();

      const createReadStream1 = imageOfSelection1.createReadStream;
      const filename1 = imageOfSelection1.filename;
      let fileStream1 = createReadStream1();

      fileStream0.on("error", (error) => console.log(error));
      fileStream1.on("error", (error) => console.log(error));

      const params0 = {
        Bucket: `${process.env.BUCKET}`,
        Key: `graphtomato/${filename0}`,
        Body: fileStream0,
        ACL: "public-read",
        ContentType: "image/jpeg",
      };

      const params1 = {
        Bucket: `${process.env.BUCKET}`,
        Key: `graphtomato/${filename1}`,
        Body: fileStream1,
        ACL: "public-read",
        ContentType: "image/jpeg",
      };

      const uploadPromise0 = (params) => {
        return new Promise(function (resolve, reject) {
          s3Uploader.upload(params, function (error, data) {
            if (error) {
              console.log(error);
            }
            resolve(data.Location);
          });
        });
      };

      savedLocation0 = await uploadPromise0(params0);
      savedLocation1 = await uploadPromise0(params1);

      for (let selection of createBalanceGameInput.balanceGameSelections) {
        if (selection.order == 0) selection.backgroundImage = savedLocation0.toString();
        if (selection.order == 1) selection.backgroundImage = savedLocation1.toString();
      }
    }
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

  // 로그인 된 경우 gameList에서 투표한거 체크
  @Query(() => BalanceGameList, {
    name: "balanceGamesLogined",
    description: "로그인한 경우 투표한 게임의 선택과 밸런스 게임 list 형태로 return",
  })
  @UseGuards(new AuthGuard())
  async findAllLogined(
    @Args("balanceGamesState", { nullable: true }) balanceGamesState: BalanceGamesStateInput,
    @Token("user") token: UserJwt
  ): Promise<BalanceGameList> {
    const limit = balanceGamesState?.limit;
    const offset = balanceGamesState?.offset;
    const balanceGames = await this.balanceGameService.findAllLogined(token.userId, limit, offset);

    return balanceGames;
  }

  // :TODO 스크롤링 추가 ! 지금은 그냥 8개
  @Query(() => BalanceGameList, { name: "myGames" })
  @UseGuards(new AuthGuard())
  async myGames(@Token("user") token: UserJwt): Promise<BalanceGameList> {
    const games = await this.balanceGameService.myGames(token.userId);

    return {
      num: games.length,
      balanceGame: games,
    };
  }

  @Query(() => [BalanceGame], { name: "balanceGamesTEST" })
  async findAllTEST(): Promise<BalanceGame[]> {
    const balanceGames = await this.balanceGameService.findAll();

    console.log(balanceGames);
    return balanceGames.balanceGame;
  }

  @Query(() => BalanceGame, { name: "balanceGameLogined" })
  @UseGuards(new AuthGuard())
  async findOneLogined(@Token("user") token: UserJwt, @Args("id") id: string): Promise<BalanceGame> {
    const result = await this.balanceGameService.findOne(token.userId, id);
    return result;
  }

  @Query(() => BalanceGame, { name: "balanceGameNotLogined" })
  async findOneNotLogined(@Token("user") token: UserJwt, @Args("id") id: string): Promise<BalanceGame> {
    const result = await this.balanceGameService.findOneNotLogined(id);
    return result;
  }

  @Query(() => BalanceGame, { name: "nextGameByRandom" })
  @UseGuards(new CheckLoginOrNot())
  async findOneByRandom(@Token("user") token: UserJwt): Promise<BalanceGame> {
    const result = await this.balanceGameService.findOneByRandom(token.userId);
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

  @Query(() => [BalanceGame], { name: "myVotedGames" })
  @UseGuards(new AuthGuard())
  async myVotedGames(@Token("user") token: UserJwt): Promise<BalanceGame[]> {
    return await this.balanceGameService.myVotedGames(token.userId);
  }
}
