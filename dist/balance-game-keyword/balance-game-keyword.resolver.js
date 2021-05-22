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
exports.BalanceGameKeywordResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const balance_game_keyword_model_1 = require("./balance-game-keyword.model");
const balance_game_keyword_service_1 = require("./balance-game-keyword.service");
const create_balance_game_keyword_input_1 = require("./dto/create-balance-game-keyword.input");
let BalanceGameKeywordResolver = class BalanceGameKeywordResolver {
    constructor(balanceGameKeywordService) {
        this.balanceGameKeywordService = balanceGameKeywordService;
    }
    async createBalanceGameKeyword(createBalanceGameKeywordInput) {
        return await this.balanceGameKeywordService.create(createBalanceGameKeywordInput);
    }
    async findAll() {
        return await this.balanceGameKeywordService.findAll();
    }
    findOne(id) {
        return this.balanceGameKeywordService.findOne(id);
    }
};
__decorate([
    graphql_1.Mutation(() => balance_game_keyword_model_1.BalanceGameKeyword),
    __param(0, graphql_1.Args("createBalanceGameKeywordInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_balance_game_keyword_input_1.CreateBalanceGameKeywordInput]),
    __metadata("design:returntype", Promise)
], BalanceGameKeywordResolver.prototype, "createBalanceGameKeyword", null);
__decorate([
    graphql_1.Query(() => [balance_game_keyword_model_1.BalanceGameKeyword], { name: "balanceGameKeywords" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BalanceGameKeywordResolver.prototype, "findAll", null);
__decorate([
    graphql_1.Query(() => balance_game_keyword_model_1.BalanceGameKeyword, { name: "balanceGameKeyword" }),
    __param(0, graphql_1.Args("id", { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BalanceGameKeywordResolver.prototype, "findOne", null);
BalanceGameKeywordResolver = __decorate([
    graphql_1.Resolver(() => balance_game_keyword_model_1.BalanceGameKeyword),
    __metadata("design:paramtypes", [balance_game_keyword_service_1.BalanceGameKeywordService])
], BalanceGameKeywordResolver);
exports.BalanceGameKeywordResolver = BalanceGameKeywordResolver;
//# sourceMappingURL=balance-game-keyword.resolver.js.map