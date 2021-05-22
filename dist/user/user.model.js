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
exports.User = void 0;
const eager_import_0 = require("../user-profile/user-profile.model");
const eager_import_1 = require("../balance-game/balance-game.model");
const eager_import_2 = require("../balance-game-selection-vote/balance-game-selection-vote.model");
const eager_import_3 = require("../balance-game-thumb/balance-game-thumb.model");
const eager_import_4 = require("../notification/notification.model");
const eager_import_5 = require("../comment/comment.model");
const eager_import_6 = require("../reply/reply.model");
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const balance_game_model_1 = require("../balance-game/balance-game.model");
const balance_game_selection_vote_model_1 = require("../balance-game-selection-vote/balance-game-selection-vote.model");
const balance_game_thumb_model_1 = require("../balance-game-thumb/balance-game-thumb.model");
const comment_model_1 = require("../comment/comment.model");
const notification_model_1 = require("../notification/notification.model");
const reply_model_1 = require("../reply/reply.model");
const user_profile_model_1 = require("../user-profile/user-profile.model");
let User = class User {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { nullable: false, type: () => String }, socialId: { nullable: false, type: () => String }, platformType: { nullable: false, type: () => String }, profile: { nullable: false, type: () => require("../user-profile/user-profile.model").UserProfile }, balanceGames: { nullable: false, type: () => [require("../balance-game/balance-game.model").BalanceGame] }, balanceGameSelectionVotes: { nullable: false, type: () => [require("../balance-game-selection-vote/balance-game-selection-vote.model").BalanceGameSelectionVote] }, balanceGameThumbs: { nullable: false, type: () => [require("../balance-game-thumb/balance-game-thumb.model").BalanceGameThumb] }, notifications: { nullable: false, type: () => [require("../notification/notification.model").Notification] }, comments: { nullable: false, type: () => [require("../comment/comment.model").Comment] }, replies: { nullable: false, type: () => [require("../reply/reply.model").Reply] }, status: { nullable: false, type: () => String }, createdAt: { nullable: false, type: () => String }, updatedAt: { nullable: false, type: () => Date } };
    }
};
__decorate([
    graphql_1.Field(),
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    graphql_1.Field(() => String),
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "socialId", void 0);
__decorate([
    graphql_1.Field(() => String),
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "platformType", void 0);
__decorate([
    typeorm_1.OneToOne(() => user_profile_model_1.UserProfile, (profile) => profile.user),
    typeorm_1.JoinColumn(),
    __metadata("design:type", user_profile_model_1.UserProfile)
], User.prototype, "profile", void 0);
__decorate([
    typeorm_1.OneToMany(() => balance_game_model_1.BalanceGame, (balanceGame) => balanceGame.user),
    __metadata("design:type", Array)
], User.prototype, "balanceGames", void 0);
__decorate([
    typeorm_1.OneToMany(() => balance_game_selection_vote_model_1.BalanceGameSelectionVote, (balanceGameSelectionVote) => balanceGameSelectionVote.user),
    __metadata("design:type", Array)
], User.prototype, "balanceGameSelectionVotes", void 0);
__decorate([
    typeorm_1.OneToMany(() => balance_game_thumb_model_1.BalanceGameThumb, (balanceGameThumb) => balanceGameThumb.user),
    __metadata("design:type", Array)
], User.prototype, "balanceGameThumbs", void 0);
__decorate([
    typeorm_1.OneToMany(() => notification_model_1.Notification, (notification) => notification.user),
    __metadata("design:type", Array)
], User.prototype, "notifications", void 0);
__decorate([
    typeorm_1.OneToMany(() => comment_model_1.Comment, (comment) => comment.user),
    __metadata("design:type", Array)
], User.prototype, "comments", void 0);
__decorate([
    typeorm_1.OneToMany(() => reply_model_1.Reply, (reply) => reply.user),
    __metadata("design:type", Array)
], User.prototype, "replies", void 0);
__decorate([
    graphql_1.Field(() => String),
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "status", void 0);
__decorate([
    graphql_1.Field(() => Date),
    typeorm_1.CreateDateColumn({ type: "timestamp" }),
    __metadata("design:type", String)
], User.prototype, "createdAt", void 0);
__decorate([
    graphql_1.Field(() => Date),
    typeorm_1.UpdateDateColumn({ type: "timestamp" }),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
User = __decorate([
    graphql_1.ObjectType(),
    typeorm_1.Entity()
], User);
exports.User = User;
//# sourceMappingURL=user.model.js.map