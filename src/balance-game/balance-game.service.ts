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

    const newBalanceGame = await this.balanceGameRepository.create(createBalanceGameInput);
    const savedBalanceGame = await this.balanceGameRepository.save(newBalanceGame);
    console.log(savedBalanceGame);

    const gameKeywords = await this.balanceGameKeywordService.create(createBalanceGameInput.balanceGameKeywords);

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
