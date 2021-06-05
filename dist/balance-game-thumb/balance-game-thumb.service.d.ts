import { Repository } from "typeorm";
import { BalanceGameThumb } from "./balance-game-thumb.model";
import { CreateBalanceGameThumbInput } from "./dto/create-balance-game-thumb.input";
export declare class BalanceGameThumbService {
    private balanceGameThumbRepository;
    constructor(balanceGameThumbRepository: Repository<BalanceGameThumb>);
    create(createBalanceGameThumbInput: CreateBalanceGameThumbInput): Promise<BalanceGameThumb>;
    findAll(): Promise<BalanceGameThumb[]>;
    findOne(id: number): string;
}
