import { Repository } from "typeorm";
import { BalanceGameKeyword } from "./balance-game-keyword.model";
import { CreateBalanceGameKeywordInput } from "./dto/create-balance-game-keyword.input";
export declare class BalanceGameKeywordService {
    private keywordRepository;
    constructor(keywordRepository: Repository<BalanceGameKeyword>);
    create(createBalanceGameKeywordInput: CreateBalanceGameKeywordInput): Promise<BalanceGameKeyword>;
    createBulk(createBalanceGameKeywordInputs: [CreateBalanceGameKeywordInput]): Promise<BalanceGameKeyword[]>;
    findAll(): Promise<BalanceGameKeyword[]>;
    findOne(id: number): string;
    removeKeywordsWithGameId(balanceGameId: string): Promise<boolean>;
}
