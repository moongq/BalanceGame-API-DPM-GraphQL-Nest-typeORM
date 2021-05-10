import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationResolver } from './notification.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './notification.model';

@Module({
  imports: [TypeOrmModule.forFeature([Notification]), ],
  providers: [NotificationResolver, NotificationService]
})
export class NotificationModule {}
