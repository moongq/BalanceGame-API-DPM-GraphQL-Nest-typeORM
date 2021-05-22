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
exports.CommentResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const comment_model_1 = require("./comment.model");
const comment_service_1 = require("./comment.service");
const create_comment_input_1 = require("./dto/create-comment.input");
const update_comment_input_1 = require("./dto/update-comment.input");
const auth_guard_1 = require("../user/guards/auth.guard");
const user_decorator_1 = require("../user/lib/user.decorator");
const user_jwt_1 = require("../user/dto/user-jwt");
let CommentResolver = class CommentResolver {
    constructor(commentService) {
        this.commentService = commentService;
    }
    async createComment(createCommentInput, token) {
        return await this.commentService.create(token.userId, createCommentInput);
    }
    async findCommentsByGameId(gameId) {
        return await this.commentService.findCommentsByGameId(gameId);
    }
    async updateComment(updateCommentInput, token) {
        return await this.commentService.update(token.userId, updateCommentInput.id, updateCommentInput.content);
    }
    async removeComment(id, token) {
        return await this.commentService.remove(token.userId, id);
    }
};
__decorate([
    graphql_1.Mutation(() => comment_model_1.Comment),
    common_1.UseGuards(new auth_guard_1.AuthGuard()),
    __param(0, graphql_1.Args("createCommentInput")),
    __param(1, user_decorator_1.Token("user")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_comment_input_1.CreateCommentInput,
        user_jwt_1.UserJwt]),
    __metadata("design:returntype", Promise)
], CommentResolver.prototype, "createComment", null);
__decorate([
    graphql_1.Query(() => [comment_model_1.Comment], { name: "commentsByGameId" }),
    __param(0, graphql_1.Args("gameId", { type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CommentResolver.prototype, "findCommentsByGameId", null);
__decorate([
    graphql_1.Mutation(() => comment_model_1.Comment),
    common_1.UseGuards(new auth_guard_1.AuthGuard()),
    __param(0, graphql_1.Args("updateCommentInput")),
    __param(1, user_decorator_1.Token("user")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_comment_input_1.UpdateCommentInput,
        user_jwt_1.UserJwt]),
    __metadata("design:returntype", Promise)
], CommentResolver.prototype, "updateComment", null);
__decorate([
    graphql_1.Mutation(() => Boolean),
    common_1.UseGuards(new auth_guard_1.AuthGuard()),
    __param(0, graphql_1.Args("id", { type: () => String })), __param(1, user_decorator_1.Token("user")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_jwt_1.UserJwt]),
    __metadata("design:returntype", Promise)
], CommentResolver.prototype, "removeComment", null);
CommentResolver = __decorate([
    graphql_1.Resolver(() => comment_model_1.Comment),
    __metadata("design:paramtypes", [comment_service_1.CommentService])
], CommentResolver);
exports.CommentResolver = CommentResolver;
//# sourceMappingURL=comment.resolver.js.map