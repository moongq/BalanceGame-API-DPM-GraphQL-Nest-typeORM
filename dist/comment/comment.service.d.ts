import { Repository } from "typeorm";
import { Comment } from "./comment.model";
import { CreateCommentInput } from "./dto/create-comment.input";
import { BalanceGame } from "../balance-game/balance-game.model";
import { BalanceGameSelectionVoteService } from "../balance-game-selection-vote/balance-game-selection-vote.service";
export declare class CommentService {
    private commentRepository;
    private balanceGameRepository;
    private balanceGameSelectionVoteService;
    constructor(commentRepository: Repository<Comment>, balanceGameRepository: Repository<BalanceGame>, balanceGameSelectionVoteService: BalanceGameSelectionVoteService);
    create(userId: string, createCommentInput: CreateCommentInput): Promise<Comment>;
    update(userId: string, commentId: string, content: string): Promise<Comment>;
    findAll(): Promise<Comment[]>;
    findCommentsByGameId(gameId: string): Promise<Comment[]>;
    remove(userId: string, commentId: string): Promise<boolean>;
    plusCommentCount(gameId: string): Promise<void>;
    minusCommentCount(gameId: string): Promise<void>;
}
