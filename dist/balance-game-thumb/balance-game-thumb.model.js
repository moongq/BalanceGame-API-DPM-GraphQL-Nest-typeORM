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
exports.BalanceGameThumb = void 0;
const eager_import_0 = require("../user/user.model");
const eager_import_1 = require("../balance-game/balance-game.model");
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const balance_game_model_1 = require("../balance-game/balance-game.model");
const user_model_1 = require("../user/user.model");
let BalanceGameThumb = class BalanceGameThumb {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { nullable: false, type: () => String }, user: { nullable: false, type: () => require("../user/user.model").User }, userId: { nullable: false, type: () => String }, balanceGame: { nullable: false, type: () => require("../balance-game/balance-game.model").BalanceGame }, balanceGameId: { nullable: false, type: () => String }, status: { nullable: false, type: () => String }, createdAt: { nullable: false, type: () => String }, updatedAt: { nullable: false, type: () => Date } };
    }
};
__decorate([
    graphql_1.Field(),
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], BalanceGameThumb.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne(() => user_model_1.User, (user) => user.balanceGameThumbs, { onDelete: "CASCADE" }),
    typeorm_1.JoinColumn({ name: "userId" }),
    __metadata("design:type", user_model_1.User)
], BalanceGameThumb.prototype, "user", void 0);
__decorate([
    graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], BalanceGameThumb.prototype, "userId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => balance_game_model_1.BalanceGame, (balanceGame) => balanceGame.balanceGameThumbs, { onDelete: "CASCADE" }),
    typeorm_1.JoinColumn({ name: "balanceGameId" }),
    __metadata("design:type", balance_game_model_1.BalanceGame)
], BalanceGameThumb.prototype, "balanceGame", void 0);
__decorate([
    graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], BalanceGameThumb.prototype, "balanceGameId", void 0);
__decorate([
    graphql_1.Field(() => String),
    typeorm_1.Column(),
    __metadata("design:type", String)
], BalanceGameThumb.prototype, "status", void 0);
__decorate([
    graphql_1.Field(() => Date),
    typeorm_1.CreateDateColumn({ type: "timestamp" }),
    __metadata("design:type", String)
], BalanceGameThumb.prototype, "createdAt", void 0);
__decorate([
    graphql_1.Field(() => Date),
    typeorm_1.UpdateDateColumn({ type: "timestamp" }),
    __metadata("design:type", Date)
], BalanceGameThumb.prototype, "updatedAt", void 0);
BalanceGameThumb = __decorate([
    graphql_1.ObjectType(),
    typeorm_1.Entity()
], BalanceGameThumb);
exports.BalanceGameThumb = BalanceGameThumb;
//# sourceMappingURL=balance-game-thumb.model.js.map