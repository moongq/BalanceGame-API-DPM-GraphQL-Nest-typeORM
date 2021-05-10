import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BalanceGame } from "../balance-game/balance-game.model";
import { BalanceGameSelection } from "./balance-game-selection.model";
import { CreateBalanceGameSelectionInput } from "./dto/create-balance-game-selection.input";
import { UpdateBalanceGameSelectionInput } from "./dto/update-balance-game-selection.input";

@Injectable()
export class BalanceGameSelectionService {
  constructor(
    @InjectRepository(BalanceGameSelection)
    private balanceGameSelectionRepository: Repository<BalanceGameSelection>
  ) {}

  async create(createBalanceGameSelectionInput: CreateBalanceGameSelectionInput): Promise<BalanceGameSelection> {
    console.log("Input Check");
    console.log(createBalanceGameSelectionInput);

    const newSelection = await this.balanceGameSelectionRepository.create(createBalanceGameSelectionInput);
    const createdSelection = await this.balanceGameSelectionRepository.save(newSelection);

    return createdSelection;
  }

  async createBulk(
    createBalanceGameSelectionInputs: [CreateBalanceGameSelectionInput]
  ): Promise<BalanceGameSelection[]> {
    const newSelections = await this.balanceGameSelectionRepository.create(createBalanceGameSelectionInputs);
    const savedSelections = await this.balanceGameSelectionRepository.save(newSelections);

    return savedSelections;
  }

  async findAll(): Promise<BalanceGameSelection[]> {
    const selections = await this.balanceGameSelectionRepository.find({});

    return selections;
  }

  findOne(id: number) {
    return `This action returns a #${id} balanceGameSelection`;
  }

  // update(id: number, updateBalanceGameSelectionInput: UpdateBalanceGameSelectionInput) {
  //   return `This action updates a #${id} balanceGameSelection`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} balanceGameSelection`;
  // }
}
