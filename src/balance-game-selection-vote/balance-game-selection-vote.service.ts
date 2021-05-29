import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CreateBalanceGameSelectionVoteInput } from "./dto/create-balance-game-selection-vote.input";
import { UpdateBalanceGameSelectionVoteInput } from "./dto/update-balance-game-selection-vote.input";

import { BalanceGame } from "../balance-game/balance-game.model";
import { BalanceGameSelection } from "../balance-game-selection/balance-game-selection.model";
import { BalanceGameSelectionVote } from "./balance-game-selection-vote.model";
import { CreateBalanceGameSelectionInput } from "../balance-game-selection/dto/create-balance-game-selection.input";

@Injectable()
export class BalanceGameSelectionVoteService {
  constructor(
    @InjectRepository(BalanceGameSelectionVote)
    private balanceGameSelectionVoteRepository: Repository<BalanceGameSelectionVote>,

    @InjectRepository(BalanceGame)
    private balanceGameRepository: Repository<BalanceGame>,

    @InjectRepository(BalanceGameSelection)
    private balanceGameSelectionRepository: Repository<BalanceGameSelection>
  ) {}

  // 직접 투표수 계산하던 방식에서 get으로 읽어오는 방식으로 수정하면서 주석화.
  // async createLogined(
  //   userId: string,
  //   createBalanceGameSelectionVoteInput: CreateBalanceGameSelectionVoteInput
  // ): Promise<BalanceGame> {
  //   const newVote = this.balanceGameSelectionVoteRepository.create({
  //     userId,
  //     ...createBalanceGameSelectionVoteInput,
  //   });
  //   const createdVote = await this.balanceGameSelectionVoteRepository.save(newVote);

  //   const result = await this.balanceGameRepository.findOne(
  //     { id: createdVote.balanceGameId },
  //     { relations: ["balanceGameKeywords", "balanceGameSelections"] }
  //   );

  //   const firstSelectionCount = await this.getSelectionCounts(result.balanceGameSelections[0].id);
  //   const secondSelectionCount = await this.getSelectionCounts(result.balanceGameSelections[1].id);
  //   result.balanceGameSelections[0].voteCount = firstSelectionCount;
  //   result.balanceGameSelections[1].voteCount = secondSelectionCount;
  //   result.totalVoteCount = firstSelectionCount + secondSelectionCount;
  //   console.log(result);
  //   return result;
  // }

  async createLogined(
    userId: string,
    createBalanceGameSelectionVoteInput: CreateBalanceGameSelectionVoteInput
  ): Promise<BalanceGame> {
    // TEST check already voted
    const getSelections = await this.balanceGameRepository.findOne(
      { id: createBalanceGameSelectionVoteInput.balanceGameId },
      { relations: ["balanceGameSelections"] }
    );

    // check already voted
    const checkBeforeCreateSelection0 = await this.balanceGameSelectionVoteRepository
      .createQueryBuilder()
      .where("balanceGameId = :gameId", { gameId: createBalanceGameSelectionVoteInput.balanceGameId })
      .andWhere("balanceGameSelectionId = :selectionId", {
        selectionId: getSelections.balanceGameSelections[0].id,
      })
      .andWhere("userId = :userId", { userId: userId })
      .getMany();

    // check already voted
    const checkBeforeCreateSelection1 = await this.balanceGameSelectionVoteRepository
      .createQueryBuilder()
      .where("balanceGameId = :gameId", { gameId: createBalanceGameSelectionVoteInput.balanceGameId })
      .andWhere("balanceGameSelectionId = :selectionId", {
        selectionId: getSelections.balanceGameSelections[1].id,
      })
      .andWhere("userId = :userId", { userId: userId })
      .getMany();

    if (checkBeforeCreateSelection0.length > 0 || checkBeforeCreateSelection1.length > 0) {
      throw new HttpException("already voted", HttpStatus.BAD_REQUEST);
    }

    const newVote = this.balanceGameSelectionVoteRepository.create({
      userId,
      ...createBalanceGameSelectionVoteInput,
    });
    const createdVote = await this.balanceGameSelectionVoteRepository.save(newVote);

    // plus totalVoteCount in GAME
    await this.balanceGameRepository
      .createQueryBuilder()
      .update()
      .where("id = :gameId", { gameId: createBalanceGameSelectionVoteInput.balanceGameId })
      .set({ totalVoteCount: () => "totalVoteCount + 1" })
      .execute();

    // plus voteCount in SELECTION
    await this.balanceGameSelectionRepository
      .createQueryBuilder()
      .update()
      .where("id = :selectionId", { selectionId: createBalanceGameSelectionVoteInput.balanceGameSelectionId })
      .set({ voteCount: () => "voteCount + 1" })
      .execute();

    const result = await this.balanceGameRepository.findOne(
      { id: createdVote.balanceGameId },
      { relations: ["balanceGameKeywords", "balanceGameSelections"] }
    );

    return result;
  }

  async createNotLogined(
    createBalanceGameSelectionVoteInput: CreateBalanceGameSelectionVoteInput
  ): Promise<BalanceGame> {
    const newVote = this.balanceGameSelectionVoteRepository.create({
      ...createBalanceGameSelectionVoteInput,
    });
    const createdVote = await this.balanceGameSelectionVoteRepository.save(newVote);

    // plus totalVoteCount in GAME
    await this.balanceGameRepository
      .createQueryBuilder()
      .update()
      .where("id = :gameId", { gameId: createBalanceGameSelectionVoteInput.balanceGameId })
      .set({ totalVoteCount: () => "totalVoteCount + 1" })
      .execute();

    // plus voteCount in SELECTION
    await this.balanceGameSelectionRepository
      .createQueryBuilder()
      .update()
      .where("id = :selectionId", { selectionId: createBalanceGameSelectionVoteInput.balanceGameSelectionId })
      .set({ voteCount: () => "voteCount + 1" })
      .execute();

    const result = await this.balanceGameRepository.findOne(
      { id: createdVote.balanceGameId },
      { relations: ["balanceGameKeywords", "balanceGameSelections"] }
    );

    return result;
  }

  async findAll(): Promise<BalanceGameSelectionVote[]> {
    return await this.balanceGameSelectionVoteRepository.find({});
  }

  findOne(id: number) {
    return `This action returns a #${id} balanceGameSelectionVote`;
  }

  async getSelectionCounts(selectionId: string) {
    return await this.balanceGameSelectionVoteRepository
      .createQueryBuilder("vote")
      .where("balanceGameSelectionId = :selectionId", { selectionId: selectionId })
      .getCount();
  }

  // voteCount 수정하면서 주석화.
  // async updateLogined(gameId: string, balanceGameSelectionId: string, currentUserId: string): Promise<BalanceGame> {
  //   // Check Ownership :TODO - guard로 빼는게 좋을듯?
  //   const result = await this.balanceGameSelectionVoteRepository
  //     .createQueryBuilder("vote")
  //     .where("balanceGameId = :gameId", { gameId: gameId })
  //     .andWhere("userId = :userId", { userId: currentUserId })
  //     .select(["vote.userId", "vote.id", "vote.balanceGameSelectionId"])
  //     .getOne();

  //   console.log(result);
  //   console.log(currentUserId);

  //   if (!result) {
  //     throw new HttpException("wrong id inputed/gameId", HttpStatus.BAD_REQUEST);
  //   }

  //   if (result["userId"] !== currentUserId) {
  //     throw new HttpException("You are not owner of this vote", HttpStatus.UNAUTHORIZED);
  //   }

  //   const deleteResult = await this.balanceGameSelectionVoteRepository
  //     .createQueryBuilder()
  //     .update()
  //     .set({ balanceGameSelectionId: result.balanceGameSelectionId })
  //     .where("id = :voteId", { voteId: result.id })
  //     .execute();

  //   if (deleteResult.affected !== 1) {
  //     throw new HttpException("not deleted/something wrong", HttpStatus.INTERNAL_SERVER_ERROR);
  //   }

  //   const game = await this.balanceGameRepository
  //     .createQueryBuilder("")
  //     .where("id = :gameId", { gameId: gameId })
  //     .getOne();
  //   console.log(game);
  //   return game;
  // }

  async updateLogined(updateInput: UpdateBalanceGameSelectionVoteInput, currentUserId: string): Promise<BalanceGame> {
    // Check Ownership :TODO - guard로 빼는게 좋을듯?
    const voteBeforeUpdate = await this.balanceGameSelectionVoteRepository
      .createQueryBuilder("vote")
      .where("balanceGameId = :gameId", { gameId: updateInput.balanceGameId })
      .andWhere("userId = :userId", { userId: currentUserId })
      .select(["vote.userId", "vote.id", "vote.balanceGameSelectionId"])
      .getOne();

    if (!voteBeforeUpdate) {
      throw new HttpException("Wrong id input/gameId", HttpStatus.BAD_REQUEST);
    }

    if (voteBeforeUpdate.balanceGameSelectionId == updateInput.newBalanceGameSelectionId) {
      throw new HttpException("already updated", HttpStatus.BAD_REQUEST);
    }

    if (voteBeforeUpdate["userId"] !== currentUserId) {
      throw new HttpException("You are not owner of this vote", HttpStatus.UNAUTHORIZED);
    }

    const updateResult = await this.balanceGameSelectionVoteRepository
      .createQueryBuilder()
      .update()
      .where("id = :voteId", { voteId: voteBeforeUpdate.id })
      .set({ balanceGameSelectionId: updateInput.newBalanceGameSelectionId })
      .execute();

    if (updateResult.affected !== 1) {
      throw new HttpException("not deleted/something wrong", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // minus voteCount in SELECTION
    await this.balanceGameSelectionRepository
      .createQueryBuilder()
      .update()
      .where("id = :selectionId", { selectionId: voteBeforeUpdate.balanceGameSelectionId })
      .set({ voteCount: () => "voteCount - 1" })
      .execute();

    // plus voteCount in SELECTION
    await this.balanceGameSelectionRepository
      .createQueryBuilder()
      .update()
      .where("id = :selectionId", { selectionId: updateInput.newBalanceGameSelectionId })
      .set({ voteCount: () => "voteCount + 1" })
      .execute();

    const game = await this.balanceGameRepository.findOne(
      { id: updateInput.balanceGameId },
      { relations: ["balanceGameKeywords", "balanceGameSelections"] }
    );
    return game;
  }

  async removeLogined(gameId: string, currentUserId: string): Promise<BalanceGame> {
    // Check Ownership :TODO - guard로 빼는게 좋을듯?
    const voteBeforeUpdate = await this.balanceGameSelectionVoteRepository
      .createQueryBuilder("vote")
      .where("balanceGameId = :gameId", { gameId: gameId })
      .andWhere("userId = :userId", { userId: currentUserId })
      .select(["vote.userId", "vote.id", "vote.balanceGameSelectionId"])
      .getOne();

    if (!voteBeforeUpdate) {
      throw new HttpException("Wrong id input/gameId", HttpStatus.BAD_REQUEST);
    }

    if (voteBeforeUpdate["userId"] !== currentUserId) {
      throw new HttpException("You are not owner of this vote", HttpStatus.UNAUTHORIZED);
    }

    const deleteResult = await this.balanceGameSelectionVoteRepository
      .createQueryBuilder()
      .delete()
      .where("id = :voteId", { voteId: voteBeforeUpdate.id })
      .execute();

    if (deleteResult.affected !== 1) {
      throw new HttpException("not deleted/something wrong", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // plus totalVoteCount in GAME
    await this.balanceGameRepository
      .createQueryBuilder()
      .update()
      .where("id = :gameId", { gameId: gameId })
      .set({ totalVoteCount: () => "totalVoteCount - 1" })
      .execute();

    // plus voteCount in SELECTION
    await this.balanceGameSelectionRepository
      .createQueryBuilder()
      .update()
      .where("id = :selectionId", { selectionId: voteBeforeUpdate.balanceGameSelectionId })
      .set({ voteCount: () => "voteCount - 1" })
      .execute();

    const game = await this.balanceGameRepository.findOne(
      { id: gameId },
      { relations: ["balanceGameKeywords", "balanceGameSelections"] }
    );
    return game;
  }

  async checkVoted(userId: string, balanceGameId: string): Promise<boolean> {
    const result = await this.balanceGameSelectionVoteRepository
      .createQueryBuilder()
      .where("userId = :userId", { userId: userId })
      .andWhere("balanceGameId = :balanceGameId", { balanceGameId: balanceGameId })
      .getMany();
    console.log(result);
    if (result.length > 0) {
      return true;
    }
    return false;
  }
}
