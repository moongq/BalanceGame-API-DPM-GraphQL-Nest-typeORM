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
exports.BalanceGameResolver = void 0;
const graphql_upload_1 = require("graphql-upload");
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const balance_game_service_1 = require("./balance-game.service");
const balance_game_model_1 = require("./balance-game.model");
const balance_game_list_output_1 = require("./dto/balance-game-list.output");
const balance_game_state_input_1 = require("./dto/balance-game-state.input");
const create_balance_game_input_1 = require("./dto/create-balance-game.input");
const update_balance_game_input_1 = require("./dto/update-balance-game.input");
const file_service_1 = require("../file/file.service");
const auth_guard_1 = require("../user/guards/auth.guard");
const user_jwt_1 = require("../user/dto/user-jwt");
const user_decorator_1 = require("../user/lib/user.decorator");
let BalanceGameResolver = class BalanceGameResolver {
    constructor(balanceGameService, fileService) {
        this.balanceGameService = balanceGameService;
        this.fileService = fileService;
    }
    async createBalanceGame(token, createBalanceGameInput) {
        return await this.balanceGameService.create(token.userId, createBalanceGameInput);
    }
    async uploadFile(file1) {
        const result = await this.fileService.uploadFile(file1);
        return result;
    }
    async findAll(balanceGamesState) {
        const limit = balanceGamesState === null || balanceGamesState === void 0 ? void 0 : balanceGamesState.limit;
        const offset = balanceGamesState === null || balanceGamesState === void 0 ? void 0 : balanceGamesState.offset;
        const balanceGames = await this.balanceGameService.findAll(limit, offset);
        return balanceGames;
    }
    async findAllTEST() {
        const balanceGames = await this.balanceGameService.findAll();
        console.log(balanceGames);
        return balanceGames.balanceGame;
    }
    async findOneLogined(token, id) {
        const result = await this.balanceGameService.findOne(token.userId, id);
        return result;
    }
    async findOneNotLogined(token, id) {
        const result = await this.balanceGameService.findOneNotLogined(id);
        return result;
    }
    async updateBalanceGame(updateBalanceGameInput, token) {
        return await this.balanceGameService.update(updateBalanceGameInput, token.userId);
    }
    async removeBalanceGame(id, token) {
        return await this.balanceGameService.remove(id, token.userId);
    }
};
__decorate([
    graphql_1.Mutation(() => balance_game_model_1.BalanceGame),
    common_1.UseGuards(new auth_guard_1.AuthGuard()),
    __param(0, user_decorator_1.Token("user")),
    __param(1, graphql_1.Args("createBalanceGameInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_jwt_1.UserJwt,
        create_balance_game_input_1.CreateBalanceGameInput]),
    __metadata("design:returntype", Promise)
], BalanceGameResolver.prototype, "createBalanceGame", null);
__decorate([
    graphql_1.Mutation(() => Boolean),
    __param(0, graphql_1.Args({ name: "file1", type: () => graphql_upload_1.GraphQLUpload })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BalanceGameResolver.prototype, "uploadFile", null);
__decorate([
    graphql_1.Query(() => balance_game_list_output_1.BalanceGameList, { name: "balanceGames", description: "밸런스 게임 list 형태로 return" }),
    __param(0, graphql_1.Args("balanceGamesState", { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [balance_game_state_input_1.BalanceGamesStateInput]),
    __metadata("design:returntype", Promise)
], BalanceGameResolver.prototype, "findAll", null);
__decorate([
    graphql_1.Query(() => [balance_game_model_1.BalanceGame], { name: "balanceGamesTEST" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BalanceGameResolver.prototype, "findAllTEST", null);
__decorate([
    graphql_1.Query(() => balance_game_model_1.BalanceGame, { name: "balanceGameLogined" }),
    common_1.UseGuards(new auth_guard_1.AuthGuard()),
    __param(0, user_decorator_1.Token("user")), __param(1, graphql_1.Args("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_jwt_1.UserJwt, String]),
    __metadata("design:returntype", Promise)
], BalanceGameResolver.prototype, "findOneLogined", null);
__decorate([
    graphql_1.Query(() => balance_game_model_1.BalanceGame, { name: "balanceGameNotLogined" }),
    __param(0, user_decorator_1.Token("user")), __param(1, graphql_1.Args("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_jwt_1.UserJwt, String]),
    __metadata("design:returntype", Promise)
], BalanceGameResolver.prototype, "findOneNotLogined", null);
__decorate([
    graphql_1.Query(() => balance_game_model_1.BalanceGame, { name: "nextGameByRandom" }),
    graphql_1.Mutation(() => balance_game_model_1.BalanceGame),
    common_1.UseGuards(new auth_guard_1.AuthGuard()),
    __param(0, graphql_1.Args("updateBalanceGameInput")),
    __param(1, user_decorator_1.Token("user")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_balance_game_input_1.UpdateBalanceGameInput,
        user_jwt_1.UserJwt]),
    __metadata("design:returntype", Promise)
], BalanceGameResolver.prototype, "updateBalanceGame", null);
__decorate([
    graphql_1.Mutation(() => Boolean),
    common_1.UseGuards(new auth_guard_1.AuthGuard()),
    __param(0, graphql_1.Args("id", { type: () => String })),
    __param(1, user_decorator_1.Token("user")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_jwt_1.UserJwt]),
    __metadata("design:returntype", Promise)
], BalanceGameResolver.prototype, "removeBalanceGame", null);
BalanceGameResolver = __decorate([
    graphql_1.Resolver(() => balance_game_model_1.BalanceGame),
    __metadata("design:paramtypes", [balance_game_service_1.BalanceGameService, file_service_1.FileService])
], BalanceGameResolver);
exports.BalanceGameResolver = BalanceGameResolver;
//# sourceMappingURL=balance-game.resolver.js.map