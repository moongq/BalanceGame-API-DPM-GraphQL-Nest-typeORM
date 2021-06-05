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
exports.BalanceGameSelection = void 0;
const eager_import_0 = require("../balance-game/balance-game.model");
const eager_import_1 = require("../balance-game-selection-vote/balance-game-selection-vote.model");
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const balance_game_model_1 = require("../balance-game/balance-game.model");
const balance_game_selection_vote_model_1 = require("../balance-game-selection-vote/balance-game-selection-vote.model");
var order;
(function (order) {
    order[order["test1"] = 0] = "test1";
    order[order["test2"] = 1] = "test2";
})(order || (order = {}));
let BalanceGameSelection = class BalanceGameSelection {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { nullable: false, type: () => String }, balanceGame: { nullable: false, type: () => require("../balance-game/balance-game.model").BalanceGame }, balanceGameId: { nullable: false, type: () => String }, balanceGameSelectionVotes: { nullable: false, type: () => [require("../balance-game-selection-vote/balance-game-selection-vote.model").BalanceGameSelectionVote] }, description: { nullable: false, type: () => String }, textColor: { nullable: false, type: () => String }, backgroundColor: { nullable: false, type: () => String }, backgroundImage: { nullable: false, type: () => String }, order: { nullable: false, type: () => order }, voteCount: { nullable: false, type: () => Number }, status: { nullable: false, type: () => String }, createdAt: { nullable: false, type: () => String }, updatedAt: { nullable: false, type: () => Date } };
    }
};
__decorate([
    graphql_1.Field(),
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], BalanceGameSelection.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne(() => balance_game_model_1.BalanceGame, (balanceGame) => balanceGame.balanceGameSelections, { onDelete: "CASCADE" }),
    typeorm_1.JoinColumn({ name: "balanceGameId" }),
    __metadata("design:type", balance_game_model_1.BalanceGame)
], BalanceGameSelection.prototype, "balanceGame", void 0);
__decorate([
    graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], BalanceGameSelection.prototype, "balanceGameId", void 0);
__decorate([
    typeorm_1.OneToMany(() => balance_game_selection_vote_model_1.BalanceGameSelectionVote, (balanceGameSelectionVote) => balanceGameSelectionVote.balanceGameSelection),
    __metadata("design:type", Array)
], BalanceGameSelection.prototype, "balanceGameSelectionVotes", void 0);
__decorate([
    graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], BalanceGameSelection.prototype, "description", void 0);
__decorate([
    graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], BalanceGameSelection.prototype, "textColor", void 0);
__decorate([
    graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], BalanceGameSelection.prototype, "backgroundColor", void 0);
__decorate([
    graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], BalanceGameSelection.prototype, "backgroundImage", void 0);
__decorate([
    graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], BalanceGameSelection.prototype, "order", void 0);
__decorate([
    graphql_1.Field(),
    typeorm_1.Column({ default: 0 }),
    __metadata("design:type", Number)
], BalanceGameSelection.prototype, "voteCount", void 0);
__decorate([
    graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], BalanceGameSelection.prototype, "status", void 0);
__decorate([
    graphql_1.Field(() => Date),
    typeorm_1.CreateDateColumn({ type: "timestamp" }),
    __metadata("design:type", String)
], BalanceGameSelection.prototype, "createdAt", void 0);
__decorate([
    graphql_1.Field(() => Date),
    typeorm_1.UpdateDateColumn({ type: "timestamp" }),
    __metadata("design:type", Date)
], BalanceGameSelection.prototype, "updatedAt", void 0);
BalanceGameSelection = __decorate([
    graphql_1.ObjectType(),
    typeorm_1.Entity()
], BalanceGameSelection);
exports.BalanceGameSelection = BalanceGameSelection;
//# sourceMappingURL=balance-game-selection.model.js.map