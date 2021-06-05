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
exports.BalanceGameSelectionResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const balance_game_selection_model_1 = require("./balance-game-selection.model");
const balance_game_selection_service_1 = require("./balance-game-selection.service");
const create_balance_game_selection_input_1 = require("./dto/create-balance-game-selection.input");
let BalanceGameSelectionResolver = class BalanceGameSelectionResolver {
    constructor(balanceGameSelectionService) {
        this.balanceGameSelectionService = balanceGameSelectionService;
    }
    async createBalanceGameSelection(createBalanceGameSelectionInput) {
        return await this.balanceGameSelectionService.create(createBalanceGameSelectionInput);
    }
    findAll() {
        return this.balanceGameSelectionService.findAll();
    }
    findOne(id) {
        return this.balanceGameSelectionService.findOne(id);
    }
};
__decorate([
    graphql_1.Mutation(() => balance_game_selection_model_1.BalanceGameSelection),
    __param(0, graphql_1.Args("createBalanceGameSelectionInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_balance_game_selection_input_1.CreateBalanceGameSelectionInput]),
    __metadata("design:returntype", Promise)
], BalanceGameSelectionResolver.prototype, "createBalanceGameSelection", null);
__decorate([
    graphql_1.Query(() => [balance_game_selection_model_1.BalanceGameSelection], { name: "balanceGameSelection" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BalanceGameSelectionResolver.prototype, "findAll", null);
__decorate([
    graphql_1.Query(() => balance_game_selection_model_1.BalanceGameSelection, { name: "balanceGameSelection" }),
    __param(0, graphql_1.Args("id", { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BalanceGameSelectionResolver.prototype, "findOne", null);
BalanceGameSelectionResolver = __decorate([
    graphql_1.Resolver(() => balance_game_selection_model_1.BalanceGameSelection),
    __metadata("design:paramtypes", [balance_game_selection_service_1.BalanceGameSelectionService])
], BalanceGameSelectionResolver);
exports.BalanceGameSelectionResolver = BalanceGameSelectionResolver;
//# sourceMappingURL=balance-game-selection.resolver.js.map