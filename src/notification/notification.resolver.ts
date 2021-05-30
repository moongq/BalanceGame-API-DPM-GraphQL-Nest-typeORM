import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";

import { Notification } from "./notification.model";
import { NotificationService } from "./notification.service";

import { CreateNotificationInput } from "./dto/create-notification.input";
import { UserJwt } from "../user/dto/user-jwt";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "../user/guards/auth.guard";
import { Token } from "../user/lib/user.decorator";

@Resolver(() => Notification)
export class NotificationResolver {
  constructor(private readonly notificationService: NotificationService) {}

  // @Mutation(() => Notification)
  // @UseGuards(new AuthGuard())
  // async createNotification(
  //   @Token("user") token: UserJwt,
  //   @Args("createNotificationInput") createNotificationInput: CreateNotificationInput
  // ): Promise<Notification> {
  //   return await this.notificationService.create(token.userId, createNotificationInput);
  // }

  @Query(() => [Notification], { name: "myNotifications" })
  @UseGuards(new AuthGuard())
  async myNotifications(@Token("user") token: UserJwt): Promise<Notification[]> {
    return await this.notificationService.myNotifications(token.userId);
  }

  @Query(() => Notification, { name: "readNoti" })
  @UseGuards(new AuthGuard())
  async readNoti(@Token("user") token: UserJwt, @Args("id", { type: () => String }) id: string) {
    return await this.notificationService.readNoti(token.userId, id);
  }
}
