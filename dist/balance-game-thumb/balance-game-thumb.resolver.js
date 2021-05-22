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
exports.BalanceGameThumbResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const balance_game_thumb_service_1 = require("./balance-game-thumb.service");
const balance_game_thumb_model_1 = require("./balance-game-thumb.model");
const create_balance_game_thumb_input_1 = require("./dto/create-balance-game-thumb.input");
let BalanceGameThumbResolver = class BalanceGameThumbResolver {
    constructor(balanceGameThumbService) {
        this.balanceGameThumbService = balanceGameThumbService;
    }
    async createBalanceGameThumb(createBalanceGameThumbInput) {
        return await this.balanceGameThumbService.create(createBalanceGameThumbInput);
    }
    async findAll() {
        return await this.balanceGameThumbService.findAll();
    }
    findOne(id) {
        return this.balanceGameThumbService.findOne(id);
    }
};
__decorate([
    graphql_1.Mutation(() => balance_game_thumb_model_1.BalanceGameThumb),
    __param(0, graphql_1.Args("createBalanceGameThumbInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_balance_game_thumb_input_1.CreateBalanceGameThumbInput]),
    __metadata("design:returntype", Promise)
], BalanceGameThumbResolver.prototype, "createBalanceGameThumb", null);
__decorate([
    graphql_1.Query(() => [balance_game_thumb_model_1.BalanceGameThumb], { name: "balanceGameThumbs" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BalanceGameThumbResolver.prototype, "findAll", null);
__decorate([
    graphql_1.Query(() => balance_game_thumb_model_1.BalanceGameThumb, { name: "balanceGameThumb" }),
    __param(0, graphql_1.Args("id", { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BalanceGameThumbResolver.prototype, "findOne", null);
BalanceGameThumbResolver = __decorate([
    graphql_1.Resolver(() => balance_game_thumb_model_1.BalanceGameThumb),
    __metadata("design:paramtypes", [balance_game_thumb_service_1.BalanceGameThumbService])
], BalanceGameThumbResolver);
exports.BalanceGameThumbResolver = BalanceGameThumbResolver;
//# sourceMappingURL=balance-game-thumb.resolver.js.map