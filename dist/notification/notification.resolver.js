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
exports.NotificationResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const notification_model_1 = require("./notification.model");
const notification_service_1 = require("./notification.service");
const create_notification_input_1 = require("./dto/create-notification.input");
let NotificationResolver = class NotificationResolver {
    constructor(notificationService) {
        this.notificationService = notificationService;
    }
    async createNotification(createNotificationInput) {
        return await this.notificationService.create(createNotificationInput);
    }
    async findAll() {
        return await this.notificationService.findAll();
    }
    async findOne(id) {
        return await this.notificationService.findOne(id);
    }
};
__decorate([
    graphql_1.Mutation(() => notification_model_1.Notification),
    __param(0, graphql_1.Args("createNotificationInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_notification_input_1.CreateNotificationInput]),
    __metadata("design:returntype", Promise)
], NotificationResolver.prototype, "createNotification", null);
__decorate([
    graphql_1.Query(() => [notification_model_1.Notification], { name: "notifications" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NotificationResolver.prototype, "findAll", null);
__decorate([
    graphql_1.Query(() => notification_model_1.Notification, { name: "notification" }),
    __param(0, graphql_1.Args("id", { type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NotificationResolver.prototype, "findOne", null);
NotificationResolver = __decorate([
    graphql_1.Resolver(() => notification_model_1.Notification),
    __metadata("design:paramtypes", [notification_service_1.NotificationService])
], NotificationResolver);
exports.NotificationResolver = NotificationResolver;
//# sourceMappingURL=notification.resolver.js.map