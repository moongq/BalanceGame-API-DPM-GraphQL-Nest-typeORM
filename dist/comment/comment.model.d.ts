import { BalanceGame } from "../balance-game/balance-game.model";
import { Notification } from "../notification/notification.model";
import { Reply } from "../reply/reply.model";
import { User } from "../user/user.model";
export declare class Comment {
    id: string;
    user: User;
    userId: string;
    balanceGame: BalanceGame;
    balanceGameId: string;
    color?: string;
    replies: Reply[];
    notifications: Notification[];
    content: string;
    status: string;
    createdAt: string;
    updatedAt: Date;
}
