import { BalanceGame } from "../balance-game/balance-game.model";
import { BalanceGameSelectionVote } from "../balance-game-selection-vote/balance-game-selection-vote.model";
declare enum order {
    test1 = 0,
    test2 = 1
}
export declare class BalanceGameSelection {
    id: string;
    balanceGame: BalanceGame;
    balanceGameId: string;
    balanceGameSelectionVotes: BalanceGameSelectionVote[];
    description: string;
    textColor: string;
    backgroundColor: string;
    backgroundImage: string;
    order: order;
    voteCount: number;
    status: string;
    createdAt: string;
    updatedAt: Date;
}
export {};
