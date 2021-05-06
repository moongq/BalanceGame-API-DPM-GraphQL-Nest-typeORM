import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BalanceGameKeyword } from "./balance-game-keyword.model";
import { CreateBalanceGameKeywordInput } from "./dto/create-balance-game-keyword.input";
import { UpdateBalanceGameKeywordInput } from "./dto/update-balance-game-keyword.input";

@Injectable()
export class BalanceGameKeywordService {
  constructor(
    @InjectRepository(BalanceGameKeyword)
    private keywordRepository: Repository<BalanceGameKeyword>
  ) {}

  async create(createBalanceGameKeywordInput: CreateBalanceGameKeywordInput): Promise<BalanceGameKeyword> {
    const newKeyword = await this.keywordRepository.create(createBalanceGameKeywordInput);
    const savedKeyword = await this.keywordRepository.save(newKeyword);

    return savedKeyword;
  }

  async createBulk(createBalanceGameKeywordInputs: [CreateBalanceGameKeywordInput]): Promise<BalanceGameKeyword[]> {
    const newKeyword = await this.keywordRepository.create(createBalanceGameKeywordInputs);
    const savedKeyword = await this.keywordRepository.save(newKeyword);

    return savedKeyword;
  }

  async findAll(): Promise<BalanceGameKeyword[]> {
    return await this.keywordRepository.find({});
  }

  findOne(id: number) {
    return `This action returns a #${id} balanceGameKeyword`;
  }

  // update(id: number, updateBalanceGameKeywordInput: UpdateBalanceGameKeywordInput) {
  //   return `This action updates a #${id} balanceGameKeyword`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} balanceGameKeyword`;
  // }
}
