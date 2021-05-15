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
import { FileService } from "../file/file.service";
import { FileUpload } from "graphql-upload";

@Injectable()
export class BalanceGameService {
  constructor(
    @InjectRepository(BalanceGame)
    private balanceGameRepository: Repository<BalanceGame>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    private balanceGameKeywordService: BalanceGameKeywordService,
    private balanceGameSelectionService: BalanceGameSelectionService,
    private fileService: FileService,
  ) {}

  // :TODO transaction 추가.
  async update(balanceGameId: string, updateBalanceGameInput: UpdateBalanceGameInput): Promise<BalanceGame> {
    // 1. update selections is has selection data
    for (let balanGameSelectionInput of updateBalanceGameInput.balanceGameSelections) {
      const updatedSelection = await this.balanceGameSelectionService.update(
        balanGameSelectionInput.id,
        balanGameSelectionInput
      );

      console.log("updatedSelection");
      console.log(updatedSelection);
    }

    // 2. update keywords if has keyword data
    // Q: 키워드 다 지워버리고 새로 생성하는 방법으로 일단 진행.
    if (updateBalanceGameInput.balanceGameKeywords.length > 0) {
      // 1. 다 지우고
      const deletedResult = await this.balanceGameKeywordService.removeKeywordsWithGameId(balanceGameId);
      console.log("deletedResult");
      console.log(deletedResult);
      // 2. 다시 모두 생성
      for (let balanceGameKeyword of updateBalanceGameInput.balanceGameKeywords) {
        const newKeyword = await this.balanceGameKeywordService.create({
          balanceGameId: balanceGameId,
          name: balanceGameKeyword.name,
        });
        console.log("new keyword");
        console.log(newKeyword);
      }
    }

    // 3. update game data if has game data
    if (updateBalanceGameInput.description) {
      const updatedBalanceGame = await this.balanceGameRepository
        .createQueryBuilder()
        .update()
        .set({ description: updateBalanceGameInput.description })
        .where(`id = :id`, { id: balanceGameId })
        .execute();

      console.log("updatedBalanceGame");
      console.log(updatedBalanceGame);
    }

    const changedGame = await this.balanceGameRepository.findOne({ id: balanceGameId });
    console.log(changedGame);
    return changedGame;
  }

  async create(token: string, createBalanceGameInput: CreateBalanceGameInput): Promise<BalanceGame> {
    const newBalanceGame = await this.balanceGameRepository.create({
      userId: token,
      description: createBalanceGameInput.description,
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

  async findAllByUserID(userId: string): Promise<BalanceGame[]> {
    return await this.balanceGameRepository.find({ userId });
  }
  // update(id: number, updateBalanceGameInput: UpdateBalanceGameInput) {
  //   return `This action updates a #${id} balanceGame`;
  // }

  async remove(balanceGameId: string): Promise<Boolean> {
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
}
