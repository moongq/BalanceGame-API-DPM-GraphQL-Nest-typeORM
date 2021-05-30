import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LessThan, MoreThan, Repository } from "typeorm";

import { Notification } from "./notification.model";

import { CreateNotificationInput } from "./dto/create-notification.input";
import { User } from "../user/user.model";

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,

    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  // :TODO 내가 쓴 댓글, 답글은 알람 안뜨게 !
  async create(userId: string, createNotificationInput: CreateNotificationInput): Promise<Notification> {
    const userData = await this.userRepository.findOne(
      { id: userId },
      { relations: ["profile"], select: ["profile", "id"] }
    );

    const newNoti = this.notificationRepository.create({
      ...createNotificationInput,
      userFromId: userId,
      userFromNickname: userData.profile.nickname,
    });

    console.log("createdNoti");
    console.log(newNoti);

    const savedNoti = await this.notificationRepository.save(newNoti);

    console.log("savedNoti");
    console.log(savedNoti);

    return savedNoti;
  }

  async myNotifications(userId: string): Promise<Notification[]> {
    const now = new Date();
    const aMonthAgo = new Date(now.setMonth(now.getMonth() - 1));

    const result = await this.notificationRepository.find({
      where: { userForId: userId, createdAt: MoreThan(aMonthAgo) },
      relations: ["comment", "reply"],
    });
    return result;
  }

  async readNoti(userId: string, notiId: string): Promise<Notification> {
    // 1. set status to 'red';

    return await this.notificationRepository.findOne({ id: notiId });
  }
}
