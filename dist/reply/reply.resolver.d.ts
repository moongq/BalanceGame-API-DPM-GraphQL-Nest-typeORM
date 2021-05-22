import { Reply } from "./reply.model";
import { ReplyService } from "./reply.service";
import { CreateReplyInput } from "./dto/create-reply.input";
import { UpdateReplyInput } from "./dto/update-reply.input";
import { UserJwt } from "../user/dto/user-jwt";
export declare class ReplyResolver {
    private readonly replyService;
    constructor(replyService: ReplyService);
    createReply(createReplyInput: CreateReplyInput, token: UserJwt): Promise<Reply>;
    updateReply(updateReplyInput: UpdateReplyInput, token: UserJwt): Promise<Reply>;
    removeReply(replyId: string, token: UserJwt): Promise<boolean>;
}
