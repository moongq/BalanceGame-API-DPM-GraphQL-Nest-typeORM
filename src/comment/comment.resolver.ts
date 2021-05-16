import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { CommentService } from "./comment.service";
import { Comment } from "./comment.model";
import { CreateCommentInput } from "./dto/create-comment.input";
import { UpdateCommentInput } from "./dto/update-comment.input";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "../user/auth.guard";
import { Token } from "../user/lib/user.decorator";
import { UserJwt } from "../user/dto/user-jwt";

@Resolver(() => Comment)
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @Mutation(() => Comment)
  @UseGuards(new AuthGuard())
  async createComment(
    @Args("createCommentInput") createCommentInput: CreateCommentInput,
    @Token("user") token: UserJwt
  ) {
    return await this.commentService.create(token.userId, createCommentInput);
  }

  @Query(() => [Comment], { name: "comments" })
  findAll() {
    return this.commentService.findAll();
  }

  @Query(() => Comment, { name: "comment" })
  findOne(@Args("id", { type: () => String }) id: string) {
    return this.commentService.findOne(id);
  }

  @Mutation(() => Comment)
  @UseGuards(new AuthGuard())
  async updateComment(
    @Args("updateCommentInput") updateCommentInput: UpdateCommentInput,
    @Token("user") token: UserJwt
  ): Promise<Comment> {
    return await this.commentService.update(token.userId, updateCommentInput.id, updateCommentInput.content);
  }

  @Mutation(() => Boolean)
  @UseGuards(new AuthGuard())
  async removeComment(@Args("id", { type: () => String }) id: string, @Token("user") token: UserJwt): Promise<boolean> {
    return await this.commentService.remove(token.userId, id);
  }
}
