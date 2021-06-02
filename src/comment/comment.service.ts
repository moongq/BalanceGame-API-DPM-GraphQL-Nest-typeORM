import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, Not } from "typeorm";

import { Comment } from "./comment.model";

import { CreateCommentInput } from "./dto/create-comment.input";

import { BalanceGame } from "../balance-game/balance-game.model";
import { BalanceGameSelectionVoteService } from "../balance-game-selection-vote/balance-game-selection-vote.service";
import { NotificationService } from "../notification/notification.service";
import { CreateNotificationInput } from "../notification/dto/create-notification.input";

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,

    @InjectRepository(BalanceGame)
    private balanceGameRepository: Repository<BalanceGame>,

    private balanceGameSelectionVoteService: BalanceGameSelectionVoteService,

    private notificationService: NotificationService
  ) {}

  async create(userId: string, createCommentInput: CreateCommentInput): Promise<Comment> {
    // CHECK 투표했는지.
    const isVoted = await this.balanceGameSelectionVoteService.checkVoted(userId, createCommentInput.balanceGameId);
    console.log("isVoted");
    console.log(isVoted);
    if (isVoted == false) {
      throw new HttpException("please vote before make comment", HttpStatus.BAD_REQUEST);
    }

    const newComment = this.commentRepository.create({ userId, ...createCommentInput });
    const savedComment = await this.commentRepository.save(newComment);

    await this.plusCommentCount(createCommentInput.balanceGameId);

    // make noti
    const getGameCreatorId = await this.balanceGameRepository.findOne({
      where: { id: createCommentInput.balanceGameId },
      select: ["userId"],
    });

    const setNotiInput = {
      kind: "new comment",
      balanceGameId: createCommentInput.balanceGameId,
      userForId: getGameCreatorId.userId, // 아 또 쿼리해야해?
      commentId: savedComment.id,
      commentContent: savedComment.content,
    };

    this.notificationService.create(userId, setNotiInput);

    return savedComment;
  }

  async update(userId: string, commentId: string, content: string): Promise<Comment> {
    const comment = await this.commentRepository.findOne({ id: commentId });

    if (!comment) {
      throw new HttpException("wrong id inputed/commentId", HttpStatus.BAD_REQUEST);
    }

    if (comment.userId !== userId) {
      throw new HttpException("힘들당...", HttpStatus.BAD_REQUEST);
    }

    const updatedComment = await this.commentRepository
      .createQueryBuilder()
      .update()
      .set({ content: content, color: comment.color })
      .where("id = :commentId", { commentId: commentId })
      .execute();

    return await this.commentRepository.findOne({ id: commentId });
  }

  // reply 까지 하고 !
  async findAll(): Promise<Comment[]> {
    return await this.commentRepository.find({});
  }

  // reply까지 하고서 !
  // 삭제 처리한 댓글은 보이지 않도록 수정 
  async findCommentsByGameId(gameId: string): Promise<Comment[]> {
    const result = await this.commentRepository.find({
      where: { 
        balanceGameId: gameId,
        status: Not("delete") 
      },
      relations: ["replies", "user", "user.profile", "replies.user", "replies.user.profile"],
    });
    return result;
  }

  async remove(userId: string, commentId: string): Promise<boolean> {
    const comment = await this.commentRepository.findOne({ id: commentId });

    if (!comment) {
      throw new HttpException("wrong id inputed//commentId", HttpStatus.BAD_REQUEST);
    }

    if (comment.userId !== userId) {
      throw new HttpException("It is not your comment", HttpStatus.BAD_REQUEST);
    }

    // 댓글 삭제가 아닌 상태값 바꾸는 걸로 수정 
    const result = await this.commentRepository
      .createQueryBuilder()
      .update()
      .set({status: "delete"})
      .where("id = :commentId", { commentId: commentId })
      .execute();

    if (result.affected !== 1) {
      throw new HttpException("something wrong in server", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    await this.minusCommentCount(comment.balanceGameId);

    return true;
  }

  async plusCommentCount(gameId: string) {
    const result = await this.balanceGameRepository
      .createQueryBuilder()
      .update()
      .where("id = :gameId", { gameId: gameId })
      .set({ commentCount: () => "commentCount + 1" })
      .execute();

    if (result.affected !== 1) {
      throw new HttpException("someThing wrong", HttpStatus.BAD_REQUEST);
    }
  }

  async minusCommentCount(gameId: string) {
    const result = await this.balanceGameRepository
      .createQueryBuilder()
      .update()
      .where("id = :gameId", { gameId: gameId })
      .set({ commentCount: () => "commentCount - 1" })
      .execute();

    if (result.affected !== 1) {
      throw new HttpException("someThing wrong", HttpStatus.BAD_REQUEST);
    }
  }
}
