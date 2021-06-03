import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Reply } from "./reply.model";

import { CreateReplyInput } from "./dto/create-reply.input";
import { UpdateReplyInput } from "./dto/update-reply.input";

import { BalanceGameSelectionVoteService } from "../balance-game-selection-vote/balance-game-selection-vote.service";
import { BalanceGame } from "../balance-game/balance-game.model";
import { NotificationService } from "../notification/notification.service";

@Injectable()
export class ReplyService {
  constructor(
    @InjectRepository(Reply)
    private replyRepository: Repository<Reply>,

    @InjectRepository(BalanceGame)
    private balanceGameRepository: Repository<BalanceGame>,

    private balanceGameSelectionVoteService: BalanceGameSelectionVoteService,
    private notificationService: NotificationService
  ) {}

  async create(userId: string, createReplyInput: CreateReplyInput): Promise<Reply> {
    // CHECK 투표했는지.
    const isVoted = await this.balanceGameSelectionVoteService.checkVoted(userId, createReplyInput.balanceGameId);
    if (isVoted == false) {
      throw new HttpException("please vote before make comment", HttpStatus.BAD_REQUEST);
    }

    const newReply = this.replyRepository.create({ userId, ...createReplyInput });
    const savedReply = await this.replyRepository.save(newReply);

    // make noti
    const getGameCreatorId = await this.balanceGameRepository.findOne({
      where: { id: createReplyInput.balanceGameId },
      select: ["userId"],
    });

    const setNotiInput = {
      kind: "new comment",
      balanceGameId: createReplyInput.balanceGameId,
      userForId: getGameCreatorId.userId,
      replyId: savedReply.id,
      replyContent: savedReply.content,
    };

    this.notificationService.create(userId, setNotiInput);
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

    // 업데이트 쿼리 결과 확인 추가 :TODO

    return await this.replyRepository.findOne({ id: updateReplyInput.replyId });
  }

  // async findAll(): Promise<Reply[]> {
  //   return await this.replyRepository.find({});
  // }

  // async findOne(id: string): Promise<Reply> {
  //   return await this.replyRepository.findOne({ id: id });
  // }

  async remove(userId: string, replyId: string): Promise<boolean> {
    const reply = await this.replyRepository.findOne({ id: replyId });

    if (!reply) {
      throw new HttpException("wrong id inputed/replyId", HttpStatus.BAD_REQUEST);
    }

    if (reply.userId !== userId) {
      throw new HttpException("It is not your reply", HttpStatus.BAD_REQUEST);
    }

    const result = await this.replyRepository
      .createQueryBuilder()
      .update()
      .set({status: "delete"})
      .where("id = :replyId", { replyId: replyId })
      .execute();

    if (result.affected !== 1) {
      throw new HttpException("something wrong in server", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return true;
  }
}
