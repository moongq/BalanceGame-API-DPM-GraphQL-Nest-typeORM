import { Repository } from "typeorm";
import { Notification } from "./notification.model";
import { CreateNotificationInput } from "./dto/create-notification.input";
import { User } from "../user/user.model";
export declare class NotificationService {
    private notificationRepository;
    private userRepository;
    constructor(notificationRepository: Repository<Notification>, userRepository: Repository<User>);
    create(userId: string, createNotificationInput: CreateNotificationInput): Promise<Notification>;
    myNotifications(userId: string): Promise<Notification[]>;
    readNoti(userId: string, notiId: string): Promise<boolean>;
}
