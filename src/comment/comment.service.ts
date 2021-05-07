import { Injectable } from '@nestjs/common';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { Comment } from "./comment.model"
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CommentService {

  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>
  ) {}

  async create(createCommentInput: CreateCommentInput): Promise<Comment> {
    const newComment = await this.commentRepository.create(createCommentInput);
    const savedComment = await this.commentRepository.save(newComment);
    
    return savedComment;
  }

  async findAll(): Promise<Comment[]> {
    return await this.commentRepository.find({});
  }

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
