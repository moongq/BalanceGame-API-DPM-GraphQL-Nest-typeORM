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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const eager_import_0 = require("../user/user.model");
const eager_import_1 = require("../balance-game/balance-game.model");
const eager_import_2 = require("../reply/reply.model");
const eager_import_3 = require("../notification/notification.model");
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const balance_game_model_1 = require("../balance-game/balance-game.model");
const notification_model_1 = require("../notification/notification.model");
const reply_model_1 = require("../reply/reply.model");
const user_model_1 = require("../user/user.model");
let Comment = class Comment {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { nullable: false, type: () => String }, user: { nullable: false, type: () => require("../user/user.model").User }, userId: { nullable: false, type: () => String }, balanceGame: { nullable: false, type: () => require("../balance-game/balance-game.model").BalanceGame }, balanceGameId: { nullable: false, type: () => String }, color: { nullable: true, type: () => String }, replies: { nullable: false, type: () => [require("../reply/reply.model").Reply] }, notifications: { nullable: false, type: () => [require("../notification/notification.model").Notification] }, content: { nullable: false, type: () => String }, status: { nullable: false, type: () => String }, createdAt: { nullable: false, type: () => String }, updatedAt: { nullable: false, type: () => Date } };
    }
};
__decorate([
    graphql_1.Field(),
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], Comment.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne(() => user_model_1.User, (user) => user.comments),
    typeorm_1.JoinColumn({ name: "userId" }),
    __metadata("design:type", user_model_1.User)
], Comment.prototype, "user", void 0);
__decorate([
    graphql_1.Field(() => String),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Comment.prototype, "userId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => balance_game_model_1.BalanceGame, (balanceGame) => balanceGame.comments, { onDelete: "CASCADE" }),
    typeorm_1.JoinColumn({ name: "balanceGameId" }),
    __metadata("design:type", balance_game_model_1.BalanceGame)
], Comment.prototype, "balanceGame", void 0);
__decorate([
    graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Comment.prototype, "balanceGameId", void 0);
__decorate([
    graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Comment.prototype, "color", void 0);
__decorate([
    typeorm_1.OneToMany(() => reply_model_1.Reply, (reply) => reply.comment),
    __metadata("design:type", Array)
], Comment.prototype, "replies", void 0);
__decorate([
    typeorm_1.OneToMany(() => notification_model_1.Notification, (notification) => notification.comment),
    __metadata("design:type", Array)
], Comment.prototype, "notifications", void 0);
__decorate([
    graphql_1.Field(() => String),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Comment.prototype, "content", void 0);
__decorate([
    graphql_1.Field(() => String),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Comment.prototype, "status", void 0);
__decorate([
    graphql_1.Field(() => Date),
    typeorm_1.CreateDateColumn({ type: "timestamp" }),
    __metadata("design:type", String)
], Comment.prototype, "createdAt", void 0);
__decorate([
    graphql_1.Field(() => Date),
    typeorm_1.UpdateDateColumn({ type: "timestamp" }),
    __metadata("design:type", Date)
], Comment.prototype, "updatedAt", void 0);
Comment = __decorate([
    graphql_1.ObjectType(),
    typeorm_1.Entity()
], Comment);
exports.Comment = Comment;
//# sourceMappingURL=comment.model.js.map