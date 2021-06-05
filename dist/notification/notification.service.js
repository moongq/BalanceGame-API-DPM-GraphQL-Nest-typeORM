"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const notification_model_1 = require("./notification.model");
const user_model_1 = require("../user/user.model");
let NotificationService = class NotificationService {
    constructor(notificationRepository, userRepository) {
        this.notificationRepository = notificationRepository;
        this.userRepository = userRepository;
    }
    async create(userId, createNotificationInput) {
        const userData = await this.userRepository.findOne({ id: userId }, { relations: ["profile"], select: ["profile", "id"] });
        const newNoti = this.notificationRepository.create(Object.assign(Object.assign({}, createNotificationInput), { userFromId: userId, userFromNickname: userData.profile.nickname }));
        console.log("createdNoti");
        console.log(newNoti);
        const savedNoti = await this.notificationRepository.save(newNoti);
        console.log("savedNoti");
        console.log(savedNoti);
        return savedNoti;
    }
    async myNotifications(userId) {
        const now = new Date();
        const aMonthAgo = new Date(now.setMonth(now.getMonth() - 1));
        const result = await this.notificationRepository.find({
            where: { userForId: userId, createdAt: typeorm_2.MoreThan(aMonthAgo) },
            relations: ["comment", "reply"],
            order: {
                createdAt: "DESC",
            },
        });
        return result;
    }
    async readNoti(userId, notiId) {
        const setRedToNoti = await this.notificationRepository
            .createQueryBuilder()
            .update()
            .where("id = :notiId", { notiId: notiId })
            .set({ status: "red" })
            .execute();
        console.log(setRedToNoti);
        if (setRedToNoti.affected == 1)
            return true;
    }
};
NotificationService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(notification_model_1.Notification)),
    __param(1, typeorm_1.InjectRepository(user_model_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], NotificationService);
exports.NotificationService = NotificationService;
//# sourceMappingURL=notification.service.js.map