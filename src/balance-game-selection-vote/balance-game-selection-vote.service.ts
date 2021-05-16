import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BalanceGameSelectionVote } from "./balance-game-selection-vote.model";
import { BalanceGameSelectionVoteModule } from "./balance-game-selection-vote.module";
import { CreateBalanceGameSelectionVoteInput } from "./dto/create-balance-game-selection-vote.input";
import { UpdateBalanceGameSelectionVoteInput } from "./dto/update-balance-game-selection-vote.input";

@Injectable()
export class BalanceGameSelectionVoteService {
  constructor(
    @InjectRepository(BalanceGameSelectionVote)
    private balanceGameSelectionVoteRepository: Repository<BalanceGameSelectionVote>
  ) {}

  async createLogined(
    userId: string,
    createBalanceGameSelectionVoteInput: CreateBalanceGameSelectionVoteInput
  ): Promise<BalanceGameSelectionVote> {
    const newVote = this.balanceGameSelectionVoteRepository.create({
      userId,
      ...createBalanceGameSelectionVoteInput,
    });
    const createdVote = await this.balanceGameSelectionVoteRepository.save(newVote);

    return createdVote;
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

  async removeLogined(voteId: string, currentUserId: string): Promise<boolean> {
    // 1. gameId랑 userId로 투표 id 받기.

    // Check Ownership :TODO - guard로 빼는게 좋을듯?
    const result = await this.balanceGameSelectionVoteRepository
      .createQueryBuilder("vote")
      .where("id = :voteId", { voteId: voteId })
      .select(["vote.userId"])
      .getOne();

    if (!result) {
      throw new HttpException("wrong id inputed/gameId", HttpStatus.BAD_REQUEST);
    }

    if (result["userId"] !== currentUserId) {
      throw new HttpException("You are not owner of this game", HttpStatus.UNAUTHORIZED);
    }

    const deleteResult = await this.balanceGameSelectionVoteRepository
      .createQueryBuilder()
      .delete()
      .where("id = :voteId", { voteId: voteId })
      .execute();

    if (deleteResult.affected == 1) {
      return true;
    } else {
      return false;
    }
  }
}
