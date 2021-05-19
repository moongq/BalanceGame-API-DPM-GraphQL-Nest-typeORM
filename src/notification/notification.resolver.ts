import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";

import { Notification } from "./notification.model";
import { NotificationService } from "./notification.service";

import { CreateNotificationInput } from "./dto/create-notification.input";

@Resolver(() => Notification)
export class NotificationResolver {
  constructor(private readonly notificationService: NotificationService) {}

  @Mutation(() => Notification)
  async createNotification(@Args("createNotificationInput") createNotificationInput: CreateNotificationInput) {
    return await this.notificationService.create(createNotificationInput);
  }

  @Query(() => [Notification], { name: "notifications" })
  async findAll() {
    return await this.notificationService.findAll();
  }

  @Query(() => Notification, { name: "notification" })
  async findOne(@Args("id", { type: () => String }) id: string) {
    return await this.notificationService.findOne(id);
  }

  // @Mutation(() => Notification)
  // updateNotification(@Args('updateNotificationInput') updateNotificationInput: UpdateNotificationInput) {
  //   return this.notificationService.update(updateNotificationInput.id, updateNotificationInput);
  // }

  // @Mutation(() => Notification)
  // removeNotification(@Args('id', { type: () => Int }) id: number) {
  //   return this.notificationService.remove(id);
  // }
}
