import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { ReplyService } from "./reply.service";
import { Reply } from "./reply.model";
import { CreateReplyInput } from "./dto/create-reply.input";
import { UpdateReplyInput } from "./dto/update-reply.input";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "../user/auth.guard";
import { Token } from "../user/lib/user.decorator";
import { UserJwt } from "../user/dto/user-jwt";

@Resolver(() => Reply)
export class ReplyResolver {
  constructor(private readonly replyService: ReplyService) {}

  @Mutation(() => Reply)
  @UseGuards(new AuthGuard())
  async createReply(
    @Args("createReplyInput") createReplyInput: CreateReplyInput,
    @Token("user") token: UserJwt
  ): Promise<Reply> {
    return await this.replyService.create(token.userId, createReplyInput);
  }

  // @Query(() => [Reply], { name: "replies" })
  // async findAll() {
  //   return await this.replyService.findAll();
  // }

  // @Query(() => Reply, { name: "reply" })
  // async findOne(@Args("id", { type: () => String }) id: string) {
  //   return await this.replyService.findOne(id);
  // }

  @Mutation(() => Reply)
  @UseGuards(new AuthGuard())
  async updateReply(
    @Args("updateReplyInput") updateReplyInput: UpdateReplyInput,
    @Token("user") token: UserJwt
  ): Promise<Reply> {
    return await this.replyService.update(token.userId, updateReplyInput);
  }

  @Mutation(() => Boolean)
  @UseGuards(new AuthGuard())
  async removeReply(
    @Args("replyId", { type: () => String }) replyId: string,
    @Token("user") token: UserJwt
  ): Promise<boolean> {
    return await this.replyService.remove(token.userId, replyId);
  }
}
