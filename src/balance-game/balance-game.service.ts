import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";

import { BalanceGame } from "./balance-game.model";

import { BalanceGameList } from "./dto/balance-game-list.output";
import { CreateBalanceGameInput } from "./dto/create-balance-game.input";
import { UpdateBalanceGameInput } from "./dto/update-balance-game.input";

import { BalanceGameKeywordService } from "../balance-game-keyword/balance-game-keyword.service";
import { BalanceGameSelectionService } from "../balance-game-selection/balance-game-selection.service";
import { FileService } from "../file/file.service";
import { User } from "../user/user.model";
import { BalanceGameSelectionVote } from "../balance-game-selection-vote/balance-game-selection-vote.model";

@Injectable()
export class BalanceGameService {
  constructor(
    @InjectRepository(BalanceGame)
    private balanceGameRepository: Repository<BalanceGame>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(BalanceGameSelectionVote)
    private balanceGameSelectionVote: Repository<BalanceGameSelectionVote>,

    @InjectRepository(BalanceGameSelectionVote)
    private voteRepository: Repository<BalanceGameSelectionVote>,

    private balanceGameKeywordService: BalanceGameKeywordService,
    private balanceGameSelectionService: BalanceGameSelectionService,

    private fileService: FileService
  ) {}

  // :TODO transaction 추가.
  async update(updateBalanceGameInput: UpdateBalanceGameInput, currentUserId: string): Promise<BalanceGame> {
    // Check Ownership :TODO - guard로 빼는게 좋을듯?
    const result = await this.balanceGameRepository
      .createQueryBuilder("game")
      .where("id = :id", { id: updateBalanceGameInput.balanceGameId })
      .select(["game.userId"])
      .getOne();

    if (!result) {
      throw new HttpException("Wrong id input/gameId", HttpStatus.BAD_REQUEST);
    }

    if (result["userId"] !== currentUserId) {
      throw new HttpException("You are not owner of this game", HttpStatus.UNAUTHORIZED);
    }

    // return;
    // 1. update selections is has selection data
    for (const balanceGameSelectionInput of updateBalanceGameInput.balanceGameSelections) {
      const updatedSelection = await this.balanceGameSelectionService.update(
        balanceGameSelectionInput.id,
        balanceGameSelectionInput
      );

      console.log("updatedSelection");
      console.log(updatedSelection);
    }

    // 2. update keywords if has keyword data
    // Q: 키워드 다 지워버리고 새로 생성하는 방법으로 일단 진행.
    if (updateBalanceGameInput.balanceGameKeywords.length > 0) {
      // 1. 다 지우고
      const deletedResult = await this.balanceGameKeywordService.removeKeywordsWithGameId(
        updateBalanceGameInput.balanceGameId
      );
      console.log("deletedResult");
      console.log(deletedResult);
      // 2. 다시 모두 생성
      for (const balanceGameKeyword of updateBalanceGameInput.balanceGameKeywords) {
        const newKeyword = await this.balanceGameKeywordService.create({
          balanceGameId: updateBalanceGameInput.balanceGameId,
          name: balanceGameKeyword.name,
        });
        console.log("new keyword");
        console.log(newKeyword);
      }
    }

    // 3. update game data if has new description
    if (updateBalanceGameInput.description) {
      const updatedBalanceGame = await this.balanceGameRepository
        .createQueryBuilder()
        .update()
        .set({ description: updateBalanceGameInput.description })
        .where(`id = :id`, { id: updateBalanceGameInput.balanceGameId })
        .execute();

      console.log("updatedBalanceGame");
      console.log(updatedBalanceGame);
    }

    const changedGame = await this.balanceGameRepository.findOne(
      { id: updateBalanceGameInput.balanceGameId },
      {
        relations: ["balanceGameSelections", "balanceGameKeywords"],
      }
    );
    console.log(changedGame);
    return changedGame;
  }

  async create(token: string, createBalanceGameInput: CreateBalanceGameInput): Promise<BalanceGame> {
    const newBalanceGame = this.balanceGameRepository.create({
      userId: token,
      description: createBalanceGameInput.description,
    });

    const savedBalanceGame = await this.balanceGameRepository.save(newBalanceGame);

    // balanceGameId 추가한 뒤 selections 생성
    for (const selection of createBalanceGameInput.balanceGameSelections) {
      selection.balanceGameId = savedBalanceGame.id;
    }

    const gameSelections = await this.balanceGameSelectionService.createBulk(
      createBalanceGameInput.balanceGameSelections
    );

    // balanceGameId 추가한 뒤 keywords 생성
    for (const keyword of createBalanceGameInput.balanceGameKeywords) {
      keyword.balanceGameId = savedBalanceGame.id;
    }

    const gameKeywords = await this.balanceGameKeywordService.createBulk(createBalanceGameInput.balanceGameKeywords);

    savedBalanceGame.balanceGameSelections = gameSelections;
    savedBalanceGame.balanceGameKeywords = gameKeywords;
    return savedBalanceGame;
  }

  async findAll(limit?: number, offset?: number): Promise<BalanceGameList> {
    const [balanceGames, count] = await this.balanceGameRepository.findAndCount({
      relations: ["balanceGameKeywords", "balanceGameSelections"],
      take: limit,
      skip: offset,
      order: {
        // :TODO 조건 추가
        createdAt: "DESC",
      },
    });

    return {
      num: count,
      balanceGame: balanceGames,
    };
  }

  async findAllTEST(): Promise<BalanceGame[]> {
    const balanceGames = await this.balanceGameRepository.find({
      relations: ["balanceGameKeywords", "balanceGameSelections"],
      take: 5,
      order: {
        // :TODO 조건 추가
        createdAt: "DESC",
      },
    });

    return balanceGames;
  }

  async findOne(userId: string, gameId: string): Promise<BalanceGame> {
    const result = await this.balanceGameRepository.findOne(
      { id: gameId },
      { relations: ["balanceGameKeywords", "balanceGameSelections"] }
    );

    if (!result) {
      throw new HttpException("Wrong id input/gameId", HttpStatus.BAD_REQUEST);
    }

    const myGameWithSelection = await this.voteRepository
      .createQueryBuilder()
      .where("userId = :userId", { userId: userId })
      .andWhere("balanceGameId = :gameId", { gameId: gameId })
      .getOne();

    if (myGameWithSelection) {
      const selectionId = myGameWithSelection.balanceGameSelectionId;
      result.mySelection = selectionId;
    } else {
      result.mySelection = null;
    }

    console.log("put voted");
    console.log(result);

    return result;
  }

  async findOneNotLogined(gameId: string): Promise<BalanceGame> {
    const result = await this.balanceGameRepository.findOne(
      { id: gameId },
      { relations: ["balanceGameKeywords", "balanceGameSelections"] }
    );

    if (!result) {
      throw new HttpException("Wrong id input/gameId", HttpStatus.BAD_REQUEST);
    }

    return result;
  }

  // :TODO 정말 랜덤하게 수정
  // :TODO 최적화..... 정말 막만든 API
  async findOneByRandom(userId: string): Promise<BalanceGame> {
    // 내 아이디가 아닌 것.

    if (!userId) {
      const game = await this.balanceGameRepository.find({
        relations: ["balanceGameKeywords", "balanceGameSelections"],
        take: 5,
      });

      const index = Math.floor(Math.random() * 4);
      return game[index];
    }

    const gameIdArray = await this.voteRepository
      .createQueryBuilder("game")
      .where("userId = :userId", { userId: userId })
      .select(["game.id"])
      .getMany();

    const getOnlyGameIds = [];
    for (let game of gameIdArray) {
      getOnlyGameIds.push(game.id);
    }

    const result = await this.balanceGameRepository
      .createQueryBuilder("game")
      .where("id NOT IN (:...gameIdArrays)", { gameIdArrays: getOnlyGameIds })
      .select("game.id")
      .getMany();

    const index = Math.floor(Math.random() * Math.floor(result.length));

    const game = await this.balanceGameRepository.findOne(
      { id: result[index].id },
      { relations: ["balanceGameKeywords", "balanceGameSelections"] }
    );

    return game;
  }

  // async findAllByUserID(userId: string): Promise<BalanceGame[]> {
  //   return await this.balanceGameRepository.find({ userId });
  // }
  // update(id: number, updateBalanceGameInput: UpdateBalanceGameInput) {
  //   return `This action updates a #${id} balanceGame`;
  // }

  async remove(balanceGameId: string, currentUserId: string): Promise<boolean> {
    // Check Ownership :TODO - guard로 빼는게 좋을듯?
    const result = await this.balanceGameRepository
      .createQueryBuilder("game")
      .where("id = :id", { id: balanceGameId })
      .select(["game.userId"])
      .getOne();

    if (!result) {
      throw new HttpException("Wrong id input/gameId", HttpStatus.BAD_REQUEST);
    }

    if (result["userId"] !== currentUserId) {
      throw new HttpException("You are not owner of this game", HttpStatus.UNAUTHORIZED);
    }

    const deleteResult = await this.balanceGameRepository
      .createQueryBuilder()
      .delete()
      .where(`id = :id`, { id: balanceGameId })
      .execute();
    console.log(deleteResult);

    if (deleteResult.affected == 1) {
      return true;
    } else {
      return false;
    }
  }

  async myVotedGames(userId: string): Promise<BalanceGame[]> {
    const gameArray = await this.balanceGameSelectionVote
      .createQueryBuilder("vote")
      .where("userId = :userId", { userId: userId })
      .select(["vote.balanceGameId"])
      .getMany();

    if (gameArray.length == 0) {
      throw new HttpException("dont have voted games", HttpStatus.BAD_REQUEST);
    }

    let getOnlyGameIds = [];

    for (let game of gameArray) {
      getOnlyGameIds.push(game.balanceGameId);
    }

    const games = await this.balanceGameRepository.find({
      where: { id: In(getOnlyGameIds) },
      relations: ["balanceGameSelections"],
    });

    return games;
  }
}
