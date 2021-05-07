import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ReplyService } from './reply.service';
import { Reply } from './reply.model';
import { CreateReplyInput } from './dto/create-reply.input';
import { UpdateReplyInput } from './dto/update-reply.input';

@Resolver(() => Reply)
export class ReplyResolver {
  constructor(private readonly replyService: ReplyService) {}

  @Mutation(() => Reply)
  async createReply(@Args('createReplyInput') createReplyInput: CreateReplyInput) {
    return await this.replyService.create(createReplyInput);
  }

  @Query(() => [Reply], { name: 'replies' })
  async findAll() {
    return await this.replyService.findAll();
  }

  @Query(() => Reply, { name: 'reply' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    return await this.replyService.findOne(id);
  }

  // @Mutation(() => Reply)
  // updateReply(@Args('updateReplyInput') updateReplyInput: UpdateReplyInput) {
  //   return this.replyService.update(updateReplyInput.id, updateReplyInput);
  // }

  // @Mutation(() => Reply)
  // removeReply(@Args('id', { type: () => Int }) id: number) {
  //   return this.replyService.remove(id);
  // }
}
