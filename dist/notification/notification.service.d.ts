import { Repository } from "typeorm";
import { Notification } from "./notification.model";
import { CreateNotificationInput } from "./dto/create-notification.input";
export declare class NotificationService {
    private notificationRepository;
    constructor(notificationRepository: Repository<Notification>);
    create(createNotificationInput: CreateNotificationInput): Promise<Notification>;
    findAll(): Promise<Notification[]>;
    findOne(id: string): Promise<Notification>;
}
