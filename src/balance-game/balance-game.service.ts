import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../user/user.model";
import { Repository } from "typeorm";
import { BalanceGame } from "./balance-game.model";
import { BalanceGameModule } from "./balance-game.module";
import { CreateBalanceGameInput } from "./dto/create-balance-game.input";
import { UpdateBalanceGameInput } from "./dto/update-balance-game.input";
import { BalanceGameKeywordService } from "../balance-game-keyword/balance-game-keyword.service";

@Injectable()
export class BalanceGameService {
  constructor(
    @InjectRepository(BalanceGame)
    private balanceGameRepository: Repository<BalanceGame>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    private balanceGameKeywordService: BalanceGameKeywordService
  ) {}

  async create(createBalanceGameInput: CreateBalanceGameInput): Promise<BalanceGame> {
    console.log("createBanalceGameInput");
    console.log(createBalanceGameInput);

    const newBalanceGame = await this.balanceGameRepository.create({
      userId: createBalanceGameInput.userId,
      description: createBalanceGameInput.description,
    });

    const savedBalanceGame = await this.balanceGameRepository.save(newBalanceGame);
    console.log("====savedBalanceGame======");
    console.log(savedBalanceGame);

    const keywordData = {
      balanceGameId: savedBalanceGame.id,
      name: createBalanceGameInput.balanceGameKeywords[0].name,
    };

    const gameKeywords = await this.balanceGameKeywordService.create(keywordData);
    console.log("savedKeyword");
    console.log(gameKeywords);

    savedBalanceGame.balanceGameKeywords = [gameKeywords];
    console.log("====RETURN VALUE====");
    console.log(savedBalanceGame);
    return savedBalanceGame;
  }

  async findAll(): Promise<BalanceGame[]> {
    return await this.balanceGameRepository.find({});
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} balanceGame`;
  // }

  // update(id: number, updateBalanceGameInput: UpdateBalanceGameInput) {
  //   return `This action updates a #${id} balanceGame`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} balanceGame`;
  // }
}
