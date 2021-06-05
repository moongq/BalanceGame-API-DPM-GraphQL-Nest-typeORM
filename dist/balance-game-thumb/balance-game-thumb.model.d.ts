import { BalanceGame } from "../balance-game/balance-game.model";
import { User } from "../user/user.model";
export declare class BalanceGameThumb {
    id: string;
    user: User;
    userId: string;
    balanceGame: BalanceGame;
    balanceGameId: string;
    status: string;
    createdAt: string;
    updatedAt: Date;
}
