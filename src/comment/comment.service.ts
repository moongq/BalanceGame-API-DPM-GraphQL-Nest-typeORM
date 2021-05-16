import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateCommentInput } from "./dto/create-comment.input";
import { UpdateCommentInput } from "./dto/update-comment.input";
import { Comment } from "./comment.model";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BalanceGameSelectionVoteService } from "../balance-game-selection-vote/balance-game-selection-vote.service";
import { BalanceGameSelectionVote } from "../balance-game-selection-vote/balance-game-selection-vote.model";
import { HttpErrorByCode } from "@nestjs/common/utils/http-error-by-code.util";

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,

    private balanceGameSelectionVoteService: BalanceGameSelectionVoteService
  ) {}

  async create(userId: string, createCommentInput: CreateCommentInput): Promise<Comment> {
    // CHECK 투표했는지.
    const isVoted = await this.balanceGameSelectionVoteService.checkVoted(userId, createCommentInput.balanceGameId);
    if (isVoted == false) {
      throw new HttpException("please vote before make comment", HttpStatus.BAD_REQUEST);
    }

    const newComment = this.commentRepository.create({ userId, ...createCommentInput });
    const savedComment = await this.commentRepository.save(newComment);

    return savedComment;
  }

  // reply 까지 하고 !
  async findAll(): Promise<Comment[]> {
    return await this.commentRepository.find({});
  }

  // reply까지 하고서 !
  async findOne(id: string): Promise<Comment> {
    return await this.commentRepository.findOne({ id: id });
  }

  // update(id: number, updateCommentInput: UpdateCommentInput) {
  //   return `This action updates a #${id} comment`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} comment`;
  // }
}
