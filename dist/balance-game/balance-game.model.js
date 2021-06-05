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
exports.BalanceGame = void 0;
const eager_import_0 = require("../user/user.model");
const eager_import_1 = require("../balance-game-selection/balance-game-selection.model");
const eager_import_2 = require("../balance-game-selection-vote/balance-game-selection-vote.model");
const eager_import_3 = require("../balance-game-thumb/balance-game-thumb.model");
const eager_import_4 = require("../balance-game-keyword/balance-game-keyword.model");
const eager_import_5 = require("../notification/notification.model");
const eager_import_6 = require("../comment/comment.model");
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const balance_game_keyword_model_1 = require("../balance-game-keyword/balance-game-keyword.model");
const balance_game_thumb_model_1 = require("../balance-game-thumb/balance-game-thumb.model");
const balance_game_selection_model_1 = require("../balance-game-selection/balance-game-selection.model");
const balance_game_selection_vote_model_1 = require("../balance-game-selection-vote/balance-game-selection-vote.model");
const comment_model_1 = require("../comment/comment.model");
const notification_model_1 = require("../notification/notification.model");
const user_model_1 = require("../user/user.model");
let BalanceGame = class BalanceGame {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { nullable: false, type: () => String }, user: { nullable: false, type: () => require("../user/user.model").User }, userId: { nullable: false, type: () => String }, balanceGameSelections: { nullable: false, type: () => [require("../balance-game-selection/balance-game-selection.model").BalanceGameSelection] }, balanceGameSelectionVotes: { nullable: false, type: () => [require("../balance-game-selection-vote/balance-game-selection-vote.model").BalanceGameSelectionVote] }, balanceGameSelectionVotesCount: { nullable: false, type: () => Number }, balanceGameThumbs: { nullable: false, type: () => [require("../balance-game-thumb/balance-game-thumb.model").BalanceGameThumb] }, balanceGameKeywords: { nullable: false, type: () => [require("../balance-game-keyword/balance-game-keyword.model").BalanceGameKeyword] }, notifications: { nullable: false, type: () => [require("../notification/notification.model").Notification] }, comments: { nullable: false, type: () => [require("../comment/comment.model").Comment] }, description: { nullable: false, type: () => String }, totalVoteCount: { nullable: false, type: () => Number }, commentCount: { nullable: false, type: () => Number }, thumbs: { nullable: false, type: () => Number }, status: { nullable: false, type: () => String }, mySelection: { nullable: false, type: () => String }, createdAt: { nullable: false, type: () => String }, updatedAt: { nullable: false, type: () => Date } };
    }
};
__decorate([
    graphql_1.Field(),
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], BalanceGame.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne(() => user_model_1.User, (user) => user.balanceGames),
    typeorm_1.JoinColumn({ name: "userId" }),
    __metadata("design:type", user_model_1.User)
], BalanceGame.prototype, "user", void 0);
__decorate([
    graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], BalanceGame.prototype, "userId", void 0);
__decorate([
    typeorm_1.OneToMany(() => balance_game_selection_model_1.BalanceGameSelection, (balanceGameSelection) => balanceGameSelection.balanceGame),
    __metadata("design:type", Array)
], BalanceGame.prototype, "balanceGameSelections", void 0);
__decorate([
    typeorm_1.OneToMany(() => balance_game_selection_vote_model_1.BalanceGameSelectionVote, (balanceGameSelectionVote) => balanceGameSelectionVote.balanceGame),
    __metadata("design:type", Array)
], BalanceGame.prototype, "balanceGameSelectionVotes", void 0);
__decorate([
    graphql_1.Field(() => Number),
    typeorm_1.Column({ default: 0 }),
    __metadata("design:type", Number)
], BalanceGame.prototype, "balanceGameSelectionVotesCount", void 0);
__decorate([
    typeorm_1.OneToMany(() => balance_game_thumb_model_1.BalanceGameThumb, (balanceGameThumb) => balanceGameThumb.balanceGame),
    __metadata("design:type", Array)
], BalanceGame.prototype, "balanceGameThumbs", void 0);
__decorate([
    typeorm_1.OneToMany(() => balance_game_keyword_model_1.BalanceGameKeyword, (balanceGameKeyword) => balanceGameKeyword.balanceGame),
    __metadata("design:type", Array)
], BalanceGame.prototype, "balanceGameKeywords", void 0);
__decorate([
    typeorm_1.OneToMany(() => notification_model_1.Notification, (notification) => notification.balanceGame),
    __metadata("design:type", Array)
], BalanceGame.prototype, "notifications", void 0);
__decorate([
    typeorm_1.OneToMany(() => comment_model_1.Comment, (comment) => comment.balanceGame),
    __metadata("design:type", Array)
], BalanceGame.prototype, "comments", void 0);
__decorate([
    graphql_1.Field(() => String),
    typeorm_1.Column(),
    __metadata("design:type", String)
], BalanceGame.prototype, "description", void 0);
__decorate([
    graphql_1.Field(() => graphql_1.Int),
    typeorm_1.Column({ default: 0 }),
    __metadata("design:type", Number)
], BalanceGame.prototype, "totalVoteCount", void 0);
__decorate([
    graphql_1.Field(() => graphql_1.Int),
    typeorm_1.Column({ default: 0 }),
    __metadata("design:type", Number)
], BalanceGame.prototype, "commentCount", void 0);
__decorate([
    graphql_1.Field(() => graphql_1.Int),
    typeorm_1.Column({ default: 0 }),
    __metadata("design:type", Number)
], BalanceGame.prototype, "thumbs", void 0);
__decorate([
    graphql_1.Field(() => String),
    typeorm_1.Column(),
    __metadata("design:type", String)
], BalanceGame.prototype, "status", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], BalanceGame.prototype, "mySelection", void 0);
__decorate([
    graphql_1.Field(() => Date),
    typeorm_1.CreateDateColumn({ type: "timestamp" }),
    __metadata("design:type", String)
], BalanceGame.prototype, "createdAt", void 0);
__decorate([
    graphql_1.Field(() => Date),
    typeorm_1.UpdateDateColumn({ type: "timestamp" }),
    __metadata("design:type", Date)
], BalanceGame.prototype, "updatedAt", void 0);
BalanceGame = __decorate([
    graphql_1.ObjectType(),
    typeorm_1.Entity()
], BalanceGame);
exports.BalanceGame = BalanceGame;
//# sourceMappingURL=balance-game.model.js.map