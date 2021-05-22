import { BalanceGameKeyword } from "./balance-game-keyword.model";
import { BalanceGameKeywordService } from "./balance-game-keyword.service";
import { CreateBalanceGameKeywordInput } from "./dto/create-balance-game-keyword.input";
export declare class BalanceGameKeywordResolver {
    private readonly balanceGameKeywordService;
    constructor(balanceGameKeywordService: BalanceGameKeywordService);
    createBalanceGameKeyword(createBalanceGameKeywordInput: CreateBalanceGameKeywordInput): Promise<BalanceGameKeyword>;
    findAll(): Promise<BalanceGameKeyword[]>;
    findOne(id: number): string;
}
