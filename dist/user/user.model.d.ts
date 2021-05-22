import { BalanceGame } from "../balance-game/balance-game.model";
import { BalanceGameSelectionVote } from "../balance-game-selection-vote/balance-game-selection-vote.model";
import { BalanceGameThumb } from "../balance-game-thumb/balance-game-thumb.model";
import { Comment } from "../comment/comment.model";
import { Notification } from "../notification/notification.model";
import { Reply } from "../reply/reply.model";
import { UserProfile } from "../user-profile/user-profile.model";
export declare class User {
    id: string;
    socialId: string;
    platformType: string;
    profile: UserProfile;
    balanceGames: BalanceGame[];
    balanceGameSelectionVotes: BalanceGameSelectionVote[];
    balanceGameThumbs: BalanceGameThumb[];
    notifications: Notification[];
    comments: Comment[];
    replies: Reply[];
    status: string;
    createdAt: string;
    updatedAt: Date;
}
