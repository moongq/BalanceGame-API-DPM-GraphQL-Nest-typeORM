import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReplyInput } from './dto/create-reply.input';
import { UpdateReplyInput } from './dto/update-reply.input';
import { Reply } from './reply.model';

@Injectable()
export class ReplyService {
  constructor(
    @InjectRepository(Reply)
    private replyRepository: Repository<Reply>
  ) {}

  async create(createReplyInput: CreateReplyInput): Promise<Reply> {
    const newReply = await this.replyRepository.create(createReplyInput);
    const savedReply = await this.replyRepository.save(newReply);

    return savedReply;
  }

  async findAll(): Promise<Reply[]> {
    
    return await this.replyRepository.find({});
  }

  async findOne(id: string): Promise<Reply> {
    return await this.replyRepository.findOne({ id: id})
  }

  // update(id: number, updateReplyInput: UpdateReplyInput) {
  //   return `This action updates a #${id} reply`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} reply`;
  // }
}
