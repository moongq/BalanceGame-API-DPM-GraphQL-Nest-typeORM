import { Notification } from "./notification.model";
import { NotificationService } from "./notification.service";
import { UserJwt } from "../user/dto/user-jwt";
export declare class NotificationResolver {
    private readonly notificationService;
    constructor(notificationService: NotificationService);
    myNotifications(token: UserJwt): Promise<Notification[]>;
    readNoti(token: UserJwt, id: string): Promise<boolean>;
}
