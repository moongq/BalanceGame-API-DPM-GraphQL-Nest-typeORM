import { BalanceGameKeyword } from "../balance-game-keyword/balance-game-keyword.model";
import { BalanceGameThumb } from "../balance-game-thumb/balance-game-thumb.model";
import { BalanceGameSelection } from "../balance-game-selection/balance-game-selection.model";
import { BalanceGameSelectionVote } from "../balance-game-selection-vote/balance-game-selection-vote.model";
import { Comment } from "../comment/comment.model";
import { Notification } from "../notification/notification.model";
import { User } from "../user/user.model";
export declare class BalanceGame {
    id: string;
    user: User;
    userId: string;
    balanceGameSelections: BalanceGameSelection[];
    balanceGameSelectionVotes: BalanceGameSelectionVote[];
    balanceGameSelectionVotesCount: number;
    balanceGameThumbs: BalanceGameThumb[];
    balanceGameKeywords: BalanceGameKeyword[];
    notifications: Notification[];
    comments: Comment[];
    description: string;
    totalVoteCount: number;
    commentCount: number;
    thumbs: number;
    status: string;
    mySelection: string;
    createdAt: string;
    updatedAt: Date;
}
