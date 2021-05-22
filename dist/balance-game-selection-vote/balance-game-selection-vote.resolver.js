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
exports.BalanceGameSelectionVoteResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const balance_game_selection_vote_service_1 = require("./balance-game-selection-vote.service");
const balance_game_selection_vote_model_1 = require("./balance-game-selection-vote.model");
const create_balance_game_selection_vote_input_1 = require("./dto/create-balance-game-selection-vote.input");
const update_balance_game_selection_vote_input_1 = require("./dto/update-balance-game-selection-vote.input");
const balance_game_model_1 = require("../balance-game/balance-game.model");
const auth_guard_1 = require("../user/guards/auth.guard");
const user_jwt_1 = require("../user/dto/user-jwt");
const user_decorator_1 = require("../user/lib/user.decorator");
let BalanceGameSelectionVoteResolver = class BalanceGameSelectionVoteResolver {
    constructor(balanceGameSelectionVoteService) {
        this.balanceGameSelectionVoteService = balanceGameSelectionVoteService;
    }
    async createBalanceGameSelectionVoteLogined(token, createBalanceGameSelectionVoteInput) {
        const result = await this.balanceGameSelectionVoteService.createLogined(token.userId, createBalanceGameSelectionVoteInput);
        return result;
    }
    async createBalanceGameSelectionVoteNotLogined(createBalanceGameSelectionVoteInput) {
        const result = await this.balanceGameSelectionVoteService.createNotLogined(createBalanceGameSelectionVoteInput);
        return result;
    }
    async findAll() {
        return await this.balanceGameSelectionVoteService.findAll();
    }
    findOne(id) {
        return this.balanceGameSelectionVoteService.findOne(id);
    }
    async updateBalanceGameSelectionVoteLogined(updateBalanceGameSelectionVoteInput, token) {
        const result = await this.balanceGameSelectionVoteService.updateLogined(updateBalanceGameSelectionVoteInput, token.userId);
        return result;
    }
    async removeBalanceGameSelectionVoteLogined(balanceGameId, token) {
        const result = await this.balanceGameSelectionVoteService.removeLogined(balanceGameId, token.userId);
        console.log(result);
        return result;
    }
};
__decorate([
    graphql_1.Mutation(() => balance_game_model_1.BalanceGame, { name: "createVoteLogined" }),
    common_1.UseGuards(new auth_guard_1.AuthGuard()),
    __param(0, user_decorator_1.Token("user")),
    __param(1, graphql_1.Args("createBalanceGameSelectionVoteInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_jwt_1.UserJwt,
        create_balance_game_selection_vote_input_1.CreateBalanceGameSelectionVoteInput]),
    __metadata("design:returntype", Promise)
], BalanceGameSelectionVoteResolver.prototype, "createBalanceGameSelectionVoteLogined", null);
__decorate([
    graphql_1.Mutation(() => balance_game_model_1.BalanceGame, { name: "createVoteNotLogined" }),
    __param(0, graphql_1.Args("createBalanceGameSelectionVoteInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_balance_game_selection_vote_input_1.CreateBalanceGameSelectionVoteInput]),
    __metadata("design:returntype", Promise)
], BalanceGameSelectionVoteResolver.prototype, "createBalanceGameSelectionVoteNotLogined", null);
__decorate([
    graphql_1.Query(() => [balance_game_selection_vote_model_1.BalanceGameSelectionVote], { name: "balanceGameSelectionVotes" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BalanceGameSelectionVoteResolver.prototype, "findAll", null);
__decorate([
    graphql_1.Query(() => balance_game_selection_vote_model_1.BalanceGameSelectionVote, { name: "balanceGameSelectionVote" }),
    __param(0, graphql_1.Args("id", { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BalanceGameSelectionVoteResolver.prototype, "findOne", null);
__decorate([
    graphql_1.Mutation(() => balance_game_model_1.BalanceGame, { name: "updateVoteLogined" }),
    common_1.UseGuards(new auth_guard_1.AuthGuard()),
    __param(0, graphql_1.Args("updateBalanceGameSelectionVoteInput")),
    __param(1, user_decorator_1.Token("user")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_balance_game_selection_vote_input_1.UpdateBalanceGameSelectionVoteInput,
        user_jwt_1.UserJwt]),
    __metadata("design:returntype", Promise)
], BalanceGameSelectionVoteResolver.prototype, "updateBalanceGameSelectionVoteLogined", null);
__decorate([
    graphql_1.Mutation(() => balance_game_model_1.BalanceGame, { name: "removeVoteLogined" }),
    common_1.UseGuards(new auth_guard_1.AuthGuard()),
    __param(0, graphql_1.Args("balanceGameId", { type: () => String })),
    __param(1, user_decorator_1.Token("user")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_jwt_1.UserJwt]),
    __metadata("design:returntype", Promise)
], BalanceGameSelectionVoteResolver.prototype, "removeBalanceGameSelectionVoteLogined", null);
BalanceGameSelectionVoteResolver = __decorate([
    graphql_1.Resolver(() => balance_game_selection_vote_model_1.BalanceGameSelectionVote),
    __metadata("design:paramtypes", [balance_game_selection_vote_service_1.BalanceGameSelectionVoteService])
], BalanceGameSelectionVoteResolver);
exports.BalanceGameSelectionVoteResolver = BalanceGameSelectionVoteResolver;
//# sourceMappingURL=balance-game-selection-vote.resolver.js.map