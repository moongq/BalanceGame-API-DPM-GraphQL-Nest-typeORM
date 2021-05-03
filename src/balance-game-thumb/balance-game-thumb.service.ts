import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BalanceGameThumb } from "./balance-game-thumb.model";
import { CreateBalanceGameThumbInput } from "./dto/create-balance-game-thumb.input";
import { UpdateBalanceGameThumbInput } from "./dto/update-balance-game-thumb.input";

@Injectable()
export class BalanceGameThumbService {
  constructor(
    @InjectRepository(BalanceGameThumb)
    private balanceGameThumbRepository: Repository<BalanceGameThumb>
  ) {}

  async create(createBalanceGameThumbInput: CreateBalanceGameThumbInput): Promise<BalanceGameThumb> {
    // console.log("thumbInput " + createBalanceGameThumbInput);

    const newThumb = await this.balanceGameThumbRepository.create(createBalanceGameThumbInput);
    const savedThumb = await this.balanceGameThumbRepository.save(newThumb);

    return savedThumb;
  }

  async findAll(): Promise<BalanceGameThumb[]> {
    return await this.balanceGameThumbRepository.find({});
  }

  findOne(id: number) {
    return `This action returns a #${id} balanceGameThumb`;
  }

  // update(id: number, updateBalanceGameThumbInput: UpdateBalanceGameThumbInput) {
  //   return `This action updates a #${id} balanceGameThumb`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} balanceGameThumb`;
  // }
}
