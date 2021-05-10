import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../user/user.model";
import { Repository } from "typeorm";
import { BalanceGame } from "./balance-game.model";
import { BalanceGameModule } from "./balance-game.module";
import { CreateBalanceGameInput } from "./dto/create-balance-game.input";
import { UpdateBalanceGameInput } from "./dto/update-balance-game.input";
import { BalanceGameKeywordService } from "../balance-game-keyword/balance-game-keyword.service";
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


  // :TODO transaction 추가.
  async update(gameId: String, updateBalanceGameInput: UpdateBalanceGameInput): Promise<BalanceGame> {
    // 1. update selections is has selection data
    for (let balanGameSelectionInput of updateBalanceGameInput.balanceGameSelections) {
      const updatedSelection = await this.balanceGameSelectionService.update(balanGameSelectionInput.id, balanGameSelectionInput)
      
      console.log('aaaa')
      console.log(updatedSelection)
    }

    // 2. update keywords if has keyword data
    
    // 3. update game data if has game data
    
    return
  }

  async create(createBalanceGameInput: CreateBalanceGameInput): Promise<BalanceGame> {
    const newBalanceGame = await this.balanceGameRepository.create({
      userId: createBalanceGameInput.userId,
      title: createBalanceGameInput.title,
    });

    const savedBalanceGame = await this.balanceGameRepository.save(newBalanceGame);

    // balanceGameId 추가한 뒤 selections 생성
    for (let selection of createBalanceGameInput.balanceGameSelections) {
      selection.balanceGameId = savedBalanceGame.id;
    }

    const gameSelections = await this.balanceGameSelectionService.createBulk(
      createBalanceGameInput.balanceGameSelections
    );

    // balanceGameId 추가한 뒤 keywords 생성
    for (let keyword of createBalanceGameInput.balanceGameKeywords) {
      keyword.balanceGameId = savedBalanceGame.id;
    }

    const gameKeywords = await this.balanceGameKeywordService.createBulk(createBalanceGameInput.balanceGameKeywords);

    savedBalanceGame.balanceGameSelections = gameSelections;
    savedBalanceGame.balanceGameKeywords = gameKeywords;
    return savedBalanceGame;
  }

  async findAll(): Promise<BalanceGame[]> {
    return await this.balanceGameRepository.find({ relations: ["balanceGameKeywords", "balanceGameSelections"] });
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
