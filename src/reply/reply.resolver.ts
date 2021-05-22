import { Resolver, Mutation, Args } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

import { Reply } from "./reply.model";
import { ReplyService } from "./reply.service";

import { CreateReplyInput } from "./dto/create-reply.input";
import { UpdateReplyInput } from "./dto/update-reply.input";

import { AuthGuard } from "../user/guards/auth.guard";
import { UserJwt } from "../user/dto/user-jwt";
import { Token } from "../user/lib/user.decorator";

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
