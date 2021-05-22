import { Repository } from "typeorm";
import { Reply } from "./reply.model";
import { CreateReplyInput } from "./dto/create-reply.input";
import { UpdateReplyInput } from "./dto/update-reply.input";
import { BalanceGameSelectionVoteService } from "../balance-game-selection-vote/balance-game-selection-vote.service";
export declare class ReplyService {
    private replyRepository;
    private balanceGameSelectionVoteService;
    constructor(replyRepository: Repository<Reply>, balanceGameSelectionVoteService: BalanceGameSelectionVoteService);
    create(userId: string, createReplyInput: CreateReplyInput): Promise<Reply>;
    update(userId: string, updateReplyInput: UpdateReplyInput): Promise<Reply>;
    remove(userId: string, replyId: string): Promise<boolean>;
}
