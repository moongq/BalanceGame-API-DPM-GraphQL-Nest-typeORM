import { Comment } from "./comment.model";
import { CommentService } from "./comment.service";
import { CreateCommentInput } from "./dto/create-comment.input";
import { UpdateCommentInput } from "./dto/update-comment.input";
import { UserJwt } from "../user/dto/user-jwt";
export declare class CommentResolver {
    private readonly commentService;
    constructor(commentService: CommentService);
    createComment(createCommentInput: CreateCommentInput, token: UserJwt): Promise<Comment>;
    findCommentsByGameId(gameId: string): Promise<Comment[]>;
    updateComment(updateCommentInput: UpdateCommentInput, token: UserJwt): Promise<Comment>;
    removeComment(id: string, token: UserJwt): Promise<boolean>;
}
