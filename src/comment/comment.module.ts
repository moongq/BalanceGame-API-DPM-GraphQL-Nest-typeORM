import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentResolver } from './comment.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from '../comment/comment.model'

@Module({
  imports: [TypeOrmModule.forFeature([Comment]),],
  providers: [CommentResolver, CommentService]
})
export class CommentModule {}
