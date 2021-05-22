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
exports.ReplyResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const reply_model_1 = require("./reply.model");
const reply_service_1 = require("./reply.service");
const create_reply_input_1 = require("./dto/create-reply.input");
const update_reply_input_1 = require("./dto/update-reply.input");
const auth_guard_1 = require("../user/guards/auth.guard");
const user_jwt_1 = require("../user/dto/user-jwt");
const user_decorator_1 = require("../user/lib/user.decorator");
let ReplyResolver = class ReplyResolver {
    constructor(replyService) {
        this.replyService = replyService;
    }
    async createReply(createReplyInput, token) {
        return await this.replyService.create(token.userId, createReplyInput);
    }
    async updateReply(updateReplyInput, token) {
        return await this.replyService.update(token.userId, updateReplyInput);
    }
    async removeReply(replyId, token) {
        return await this.replyService.remove(token.userId, replyId);
    }
};
__decorate([
    graphql_1.Mutation(() => reply_model_1.Reply),
    common_1.UseGuards(new auth_guard_1.AuthGuard()),
    __param(0, graphql_1.Args("createReplyInput")),
    __param(1, user_decorator_1.Token("user")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_reply_input_1.CreateReplyInput,
        user_jwt_1.UserJwt]),
    __metadata("design:returntype", Promise)
], ReplyResolver.prototype, "createReply", null);
__decorate([
    graphql_1.Mutation(() => reply_model_1.Reply),
    common_1.UseGuards(new auth_guard_1.AuthGuard()),
    __param(0, graphql_1.Args("updateReplyInput")),
    __param(1, user_decorator_1.Token("user")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_reply_input_1.UpdateReplyInput,
        user_jwt_1.UserJwt]),
    __metadata("design:returntype", Promise)
], ReplyResolver.prototype, "updateReply", null);
__decorate([
    graphql_1.Mutation(() => Boolean),
    common_1.UseGuards(new auth_guard_1.AuthGuard()),
    __param(0, graphql_1.Args("replyId", { type: () => String })),
    __param(1, user_decorator_1.Token("user")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_jwt_1.UserJwt]),
    __metadata("design:returntype", Promise)
], ReplyResolver.prototype, "removeReply", null);
ReplyResolver = __decorate([
    graphql_1.Resolver(() => reply_model_1.Reply),
    __metadata("design:paramtypes", [reply_service_1.ReplyService])
], ReplyResolver);
exports.ReplyResolver = ReplyResolver;
//# sourceMappingURL=reply.resolver.js.map