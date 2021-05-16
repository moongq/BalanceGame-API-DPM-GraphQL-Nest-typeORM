import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SSL_OP_CIPHER_SERVER_PREFERENCE } from "node:constants";
import { Repository } from "typeorm";
import { BalanceGame } from "../balance-game/balance-game.model";
import { BalanceGameService } from "../balance-game/balance-game.service";
import { BalanceGameSelectionVote } from "./balance-game-selection-vote.model";
import { BalanceGameSelectionVoteModule } from "./balance-game-selection-vote.module";
import { CreateBalanceGameSelectionVoteInput } from "./dto/create-balance-game-selection-vote.input";
import { UpdateBalanceGameSelectionVoteInput } from "./dto/update-balance-game-selection-vote.input";

@Injectable()
export class BalanceGameSelectionVoteService {
  constructor(
    @InjectRepository(BalanceGameSelectionVote)
    private balanceGameSelectionVoteRepository: Repository<BalanceGameSelectionVote>,

    @InjectRepository(BalanceGame)
    private balanceGameRepository: Repository<BalanceGame>
  ) {}

  async createLogined(
    userId: string,
    createBalanceGameSelectionVoteInput: CreateBalanceGameSelectionVoteInput
  ): Promise<BalanceGame> {
    const newVote = this.balanceGameSelectionVoteRepository.create({
      userId,
      ...createBalanceGameSelectionVoteInput,
    });
    const createdVote = await this.balanceGameSelectionVoteRepository.save(newVote);

    const result = await this.balanceGameRepository.findOne(
      { id: createdVote.balanceGameId },
      { relations: ["balanceGameKeywords", "balanceGameSelections"] }
    );

    const firstSelectionCount = await this.getSelectionCounts(result.balanceGameSelections[0].id);
    const secondSelectionCount = await this.getSelectionCounts(result.balanceGameSelections[1].id);
    result.balanceGameSelections[0].voteCount = firstSelectionCount;
    result.balanceGameSelections[1].voteCount = secondSelectionCount;
    result.totalVoteCount = firstSelectionCount + secondSelectionCount;
    console.log(result);
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

  // update(id: number, updateBalanceGameSelectionVoteInput: UpdateBalanceGameSelectionVoteInput) {
  //   return `This action updates a #${id} balanceGameSelectionVote`;
  // }

  async removeLogined(gameId: string, currentUserId: string): Promise<BalanceGame> {
    // Check Ownership :TODO - guard로 빼는게 좋을듯?
    const result = await this.balanceGameSelectionVoteRepository
      .createQueryBuilder("vote")
      .where("balanceGameId = :gameId", { gameId: gameId })
      .andWhere("userId = :userId", { userId: currentUserId })
      .select(["vote.userId", "vote.id"])
      .getOne();

    console.log(result);
    console.log(currentUserId);

    if (!result) {
      throw new HttpException("wrong id inputed/gameId", HttpStatus.BAD_REQUEST);
    }

    if (result["userId"] !== currentUserId) {
      throw new HttpException("You are not owner of this vote", HttpStatus.UNAUTHORIZED);
    }

    const deleteResult = await this.balanceGameSelectionVoteRepository
      .createQueryBuilder()
      .delete()
      .where("id = :voteId", { voteId: result.id })
      .execute();

    if (deleteResult.affected !== 1) {
      throw new HttpException("not deleted/something wrong", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    const game = await this.balanceGameRepository
      .createQueryBuilder("")
      .where("id = :gameId", { gameId: gameId })
      .getOne();

    return game;
  }
}
