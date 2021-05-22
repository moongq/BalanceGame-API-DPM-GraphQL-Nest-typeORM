import { BalanceGameThumbService } from "./balance-game-thumb.service";
import { BalanceGameThumb } from "./balance-game-thumb.model";
import { CreateBalanceGameThumbInput } from "./dto/create-balance-game-thumb.input";
export declare class BalanceGameThumbResolver {
    private readonly balanceGameThumbService;
    constructor(balanceGameThumbService: BalanceGameThumbService);
    createBalanceGameThumb(createBalanceGameThumbInput: CreateBalanceGameThumbInput): Promise<BalanceGameThumb>;
    findAll(): Promise<BalanceGameThumb[]>;
    findOne(id: number): string;
}
