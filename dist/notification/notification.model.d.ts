import { Comment } from "../comment/comment.model";
import { User } from "../user/user.model";
import { BalanceGame } from "../balance-game/balance-game.model";
export declare class Notification {
    id: string;
    user: User;
    userForId: string;
    userFromId: string;
    balanceGame: BalanceGame;
    balanceGameId: string;
    comment: Comment;
    commentId: string;
    content: string;
    replyNickname: string;
    status: string;
    createdAt: string;
    updatedAt: Date;
}
