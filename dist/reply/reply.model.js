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
exports.Reply = void 0;
const eager_import_0 = require("../user/user.model");
const eager_import_1 = require("../balance-game/balance-game.model");
const eager_import_2 = require("../comment/comment.model");
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const balance_game_model_1 = require("../balance-game/balance-game.model");
const comment_model_1 = require("../comment/comment.model");
const user_model_1 = require("../user/user.model");
let Reply = class Reply {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { nullable: false, type: () => String }, user: { nullable: false, type: () => require("../user/user.model").User }, userId: { nullable: false, type: () => String }, balanceGame: { nullable: false, type: () => require("../balance-game/balance-game.model").BalanceGame }, balanceGameId: { nullable: false, type: () => String }, comment: { nullable: false, type: () => require("../comment/comment.model").Comment }, commentId: { nullable: false, type: () => String }, color: { nullable: true, type: () => String }, content: { nullable: false, type: () => String }, status: { nullable: false, type: () => String }, createdAt: { nullable: false, type: () => String }, updatedAt: { nullable: false, type: () => Date } };
    }
};
__decorate([
    graphql_1.Field(),
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], Reply.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne(() => user_model_1.User, (user) => user.comments),
    typeorm_1.JoinColumn({ name: "userId" }),
    __metadata("design:type", user_model_1.User)
], Reply.prototype, "user", void 0);
__decorate([
    graphql_1.Field(() => String),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Reply.prototype, "userId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => balance_game_model_1.BalanceGame, (balanceGame) => balanceGame.comments, { onDelete: "CASCADE" }),
    typeorm_1.JoinColumn({ name: "balanceGameId" }),
    __metadata("design:type", balance_game_model_1.BalanceGame)
], Reply.prototype, "balanceGame", void 0);
__decorate([
    graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Reply.prototype, "balanceGameId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => comment_model_1.Comment, (comment) => comment.replies, { onDelete: "CASCADE" }),
    typeorm_1.JoinColumn({ name: "commentId" }),
    __metadata("design:type", comment_model_1.Comment)
], Reply.prototype, "comment", void 0);
__decorate([
    graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Reply.prototype, "commentId", void 0);
__decorate([
    graphql_1.Field(),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Reply.prototype, "color", void 0);
__decorate([
    graphql_1.Field(() => String),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Reply.prototype, "content", void 0);
__decorate([
    graphql_1.Field(() => String),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Reply.prototype, "status", void 0);
__decorate([
    graphql_1.Field(() => Date),
    typeorm_1.CreateDateColumn({ type: "timestamp" }),
    __metadata("design:type", String)
], Reply.prototype, "createdAt", void 0);
__decorate([
    graphql_1.Field(() => Date),
    typeorm_1.CreateDateColumn({ type: "timestamp" }),
    __metadata("design:type", Date)
], Reply.prototype, "updatedAt", void 0);
Reply = __decorate([
    graphql_1.ObjectType(),
    typeorm_1.Entity()
], Reply);
exports.Reply = Reply;
//# sourceMappingURL=reply.model.js.map