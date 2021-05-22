import { BalanceGame } from "../balance-game/balance-game.model";
import { BalanceGameSelection } from "../balance-game-selection/balance-game-selection.model";
import { User } from "../user/user.model";
export declare class BalanceGameSelectionVote {
    id: string;
    user?: User;
    userId?: string;
    balanceGame: BalanceGame;
    balanceGameId: string;
    balanceGameSelection: BalanceGameSelection;
    balanceGameSelectionId: string;
    voteCount: number;
    status: string;
    createdAt: string;
    updatedAt: Date;
}
