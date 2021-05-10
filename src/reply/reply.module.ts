import { Module } from '@nestjs/common';
import { ReplyService } from './reply.service';
import { ReplyResolver } from './reply.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reply } from './reply.model';

@Module({
  imports: [TypeOrmModule.forFeature([Reply]),],
  providers: [ReplyResolver, ReplyService]
})
export class ReplyModule {}
