import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Notification } from "./notification.model";
import { NotificationResolver } from "./notification.resolver";
import { NotificationService } from "./notification.service";

@Module({
  imports: [TypeOrmModule.forFeature([Notification])],
  providers: [NotificationResolver, NotificationService],
})
export class NotificationModule {}
