import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BalanceGameSelectionVoteService } from "../balance-game-selection-vote/balance-game-selection-vote.service";
import { CreateReplyInput } from "./dto/create-reply.input";
import { UpdateReplyInput } from "./dto/update-reply.input";
import { Reply } from "./reply.model";

@Injectable()
export class ReplyService {
  constructor(
    @InjectRepository(Reply)
    private replyRepository: Repository<Reply>,

    private balanceGameSelectionVoteService: BalanceGameSelectionVoteService
  ) {}

  async create(userId: string, createReplyInput: CreateReplyInput): Promise<Reply> {
    // CHECK 투표했는지.
    const isVoted = await this.balanceGameSelectionVoteService.checkVoted(userId, createReplyInput.balanceGameId);
    if (isVoted == false) {
      throw new HttpException("please vote before make comment", HttpStatus.BAD_REQUEST);
    }

    const newReply = this.replyRepository.create({ userId, ...createReplyInput });
    const savedReply = await this.replyRepository.save(newReply);

    return savedReply;
  }
  async update(userId: string, updateReplyInput: UpdateReplyInput): Promise<Reply> {
    const reply = await this.replyRepository.findOne({ id: updateReplyInput.replyId });

    if (!reply) {
      throw new HttpException("wrong id inputed/replyId", HttpStatus.BAD_REQUEST);
    }
    if (reply.userId !== userId) {
      throw new HttpException("you are not owner of this reply", HttpStatus.BAD_REQUEST);
    }

    const updatedComment = await this.replyRepository
      .createQueryBuilder()
      .update()
      .set({ content: updateReplyInput.content, color: reply.color })
      .where("id = :replyId", { replyId: updateReplyInput.replyId })
      .execute();

    return await this.replyRepository.findOne({ id: updateReplyInput.replyId });
  }

  async findAll(): Promise<Reply[]> {
    return await this.replyRepository.find({});
  }

  async findOne(id: string): Promise<Reply> {
    return await this.replyRepository.findOne({ id: id });
  }

  // remove(id: number) {
  //   return `This action removes a #${id} reply`;
  // }
}
