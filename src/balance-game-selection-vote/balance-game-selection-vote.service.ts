import { Injectable } from "@nestjs/common";
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

  async create(
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

  // remove(id: number) {
  //   return `This action removes a #${id} balanceGameSelectionVote`;
  // }
}
