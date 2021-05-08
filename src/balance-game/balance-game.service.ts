import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../user/user.model";
import { Repository } from "typeorm";
import { BalanceGame } from "./balance-game.model";
import { BalanceGameModule } from "./balance-game.module";
import { CreateBalanceGameInput } from "./dto/create-balance-game.input";
import { UpdateBalanceGameInput } from "./dto/update-balance-game.input";
import { BalanceGameKeywordService } from "../balance-game-keyword/balance-game-keyword.service";
import { identity } from "rxjs";
import { BalanceGameSelectionService } from "../balance-game-selection/balance-game-selection.service";

@Injectable()
export class BalanceGameService {
  constructor(
    @InjectRepository(BalanceGame)
    private balanceGameRepository: Repository<BalanceGame>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    private balanceGameKeywordService: BalanceGameKeywordService,
    private balanceGameSelectionService: BalanceGameSelectionService
  ) {}

  async create(createBalanceGameInput: CreateBalanceGameInput): Promise<BalanceGame> {
    const newBalanceGame = await this.balanceGameRepository.create({
      userId: createBalanceGameInput.userId,
      title: createBalanceGameInput.title,
    });

    const savedBalanceGame = await this.balanceGameRepository.save(newBalanceGame);

    for (let selection of createBalanceGameInput.balanceGameSelections) {
      selection.balanceGameId = savedBalanceGame.id;
    }

    const gameSelections = await this.balanceGameSelectionService.createBulk(
      createBalanceGameInput.balanceGameSelections
    );

    for (let keyword of createBalanceGameInput.balanceGameKeywords) {
      keyword.balanceGameId = savedBalanceGame.id;
    }

    const gameKeywords = await this.balanceGameKeywordService.createBulk(createBalanceGameInput.balanceGameKeywords);

    savedBalanceGame.balanceGameSelections = gameSelections;
    savedBalanceGame.balanceGameKeywords = gameKeywords;
    return savedBalanceGame;
  }

  async findAll(): Promise<BalanceGame[]> {
    return await this.balanceGameRepository.find({ relations: ["balanceGameKeywords"] });
  }

  async findOne(id: string): Promise<BalanceGame> {
    return await this.balanceGameRepository.findOne({ id: id }, { relations: ["balanceGameKeywords"] });
  }

  // update(id: number, updateBalanceGameInput: UpdateBalanceGameInput) {
  //   return `This action updates a #${id} balanceGame`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} balanceGame`;
  // }
}
