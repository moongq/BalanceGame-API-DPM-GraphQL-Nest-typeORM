import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../user/user.model";
import { Repository } from "typeorm";
import { BalanceGame } from "./balance-game.model";
import { BalanceGameModule } from "./balance-game.module";
import { CreateBalanceGameInput } from "./dto/create-balance-game.input";
import { UpdateBalanceGameInput } from "./dto/update-balance-game.input";

@Injectable()
export class BalanceGameService {
  constructor(
    @InjectRepository(BalanceGame)
    private balanceGameRepository: Repository<BalanceGame>,

    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async create(createBalanceGameInput: CreateBalanceGameInput): Promise<BalanceGame> {
    console.log("createBanalceGameInput");
    console.log(createBalanceGameInput);

    const newBalanceGame = await this.balanceGameRepository.create(createBalanceGameInput);
    const savedBalanceGame = await this.balanceGameRepository.save(newBalanceGame);
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
