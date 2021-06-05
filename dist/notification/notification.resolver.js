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
const user_jwt_1 = require("../user/dto/user-jwt");
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../user/guards/auth.guard");
const user_decorator_1 = require("../user/lib/user.decorator");
let NotificationResolver = class NotificationResolver {
    constructor(notificationService) {
        this.notificationService = notificationService;
    }
    async myNotifications(token) {
        return await this.notificationService.myNotifications(token.userId);
    }
    async readNoti(token, id) {
        return await this.notificationService.readNoti(token.userId, id);
    }
};
__decorate([
    graphql_1.Query(() => [notification_model_1.Notification], { name: "myNotifications" }),
    common_1.UseGuards(new auth_guard_1.AuthGuard()),
    __param(0, user_decorator_1.Token("user")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_jwt_1.UserJwt]),
    __metadata("design:returntype", Promise)
], NotificationResolver.prototype, "myNotifications", null);
__decorate([
    graphql_1.Mutation(() => Boolean, { name: "readNoti" }),
    common_1.UseGuards(new auth_guard_1.AuthGuard()),
    __param(0, user_decorator_1.Token("user")), __param(1, graphql_1.Args("id", { type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_jwt_1.UserJwt, String]),
    __metadata("design:returntype", Promise)
], NotificationResolver.prototype, "readNoti", null);
NotificationResolver = __decorate([
    graphql_1.Resolver(() => notification_model_1.Notification),
    __metadata("design:paramtypes", [notification_service_1.NotificationService])
], NotificationResolver);
exports.NotificationResolver = NotificationResolver;
//# sourceMappingURL=notification.resolver.js.map