"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BalanceGameSelectionModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const balance_game_selection_model_1 = require("./balance-game-selection.model");
const balance_game_selection_resolver_1 = require("./balance-game-selection.resolver");
const balance_game_selection_service_1 = require("./balance-game-selection.service");
const balance_game_model_1 = require("../balance-game/balance-game.model");
const user_model_1 = require("../user/user.model");
let BalanceGameSelectionModule = class BalanceGameSelectionModule {
};
BalanceGameSelectionModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([balance_game_selection_model_1.BalanceGameSelection, balance_game_model_1.BalanceGame, user_model_1.User])],
        providers: [balance_game_selection_resolver_1.BalanceGameSelectionResolver, balance_game_selection_service_1.BalanceGameSelectionService],
        exports: [balance_game_selection_service_1.BalanceGameSelectionService],
    })
], BalanceGameSelectionModule);
exports.BalanceGameSelectionModule = BalanceGameSelectionModule;
//# sourceMappingURL=balance-game-selection.module.js.map