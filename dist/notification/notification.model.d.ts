import { Comment } from "../comment/comment.model";
import { User } from "../user/user.model";
import { BalanceGame } from "../balance-game/balance-game.model";
import { Reply } from "../reply/reply.model";
export declare class Notification {
    id: string;
    kind: string;
    balanceGame: BalanceGame;
    balanceGameId: string;
    user: User;
    userForId: string;
    userFromId: string;
    userFromNickname: string;
    color: string;
    comment: Comment;
    commentId: string;
    commentContent: string;
    reply: Reply;
    replyId: string;
    replyContent: string;
    status: string;
    createdAt: string;
}
