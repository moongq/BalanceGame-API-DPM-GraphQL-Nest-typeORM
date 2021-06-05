import { CreateBalanceGameKeywordInput } from "../../balance-game-keyword/dto/create-balance-game-keyword.input";
import { UpdateBalanceGameSelectionInput } from "../../balance-game-selection/dto/update-balance-game-selection.input";
export declare class UpdateBalanceGameInput {
    balanceGameId: string;
    description?: string;
    balanceGameSelections?: [UpdateBalanceGameSelectionInput];
    balanceGameKeywords?: [CreateBalanceGameKeywordInput];
}
