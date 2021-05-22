import { Notification } from "./notification.model";
import { NotificationService } from "./notification.service";
import { CreateNotificationInput } from "./dto/create-notification.input";
export declare class NotificationResolver {
    private readonly notificationService;
    constructor(notificationService: NotificationService);
    createNotification(createNotificationInput: CreateNotificationInput): Promise<Notification>;
    findAll(): Promise<Notification[]>;
    findOne(id: string): Promise<Notification>;
}
