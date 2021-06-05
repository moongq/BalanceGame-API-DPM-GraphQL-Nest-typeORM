import { CreateBalanceGameKeywordInput } from "../../balance-game-keyword/dto/create-balance-game-keyword.input";
import { CreateBalanceGameSelectionInput } from "../../balance-game-selection/dto/create-balance-game-selection.input";
export declare class CreateBalanceGameInput {
    description: string;
    balanceGameSelections: [CreateBalanceGameSelectionInput];
    balanceGameKeywords: [CreateBalanceGameKeywordInput];
}
