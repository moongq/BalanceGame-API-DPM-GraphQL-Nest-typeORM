import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNotificationInput } from './dto/create-notification.input';
import { UpdateNotificationInput } from './dto/update-notification.input';
import { Notification } from './notification.model';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>
  ) {}

  async create(createNotificationInput: CreateNotificationInput): Promise<Notification> {
    const newNoti = await this.notificationRepository.create(createNotificationInput)
    const savedNoti = await this.notificationRepository.save(newNoti);

    return savedNoti;
  
  }

  async findAll(): Promise<Notification[]> {
    return await this.notificationRepository.find({});
  }

  async findOne(id: string): Promise<Notification> {
    return await this.notificationRepository.findOne({ id: id })
  }

  // update(id: number, updateNotificationInput: UpdateNotificationInput) {
  //   return `This action updates a #${id} notification`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} notification`;
  // }
}
