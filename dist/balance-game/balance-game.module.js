"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BalanceGameModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const balance_game_model_1 = require("./balance-game.model");
const balance_game_resolver_1 = require("./balance-game.resolver");
const balance_game_service_1 = require("./balance-game.service");
const balance_game_keyword_module_1 = require("../balance-game-keyword/balance-game-keyword.module");
const balance_game_selection_module_1 = require("../balance-game-selection/balance-game-selection.module");
const balance_game_selection_vote_module_1 = require("../balance-game-selection-vote/balance-game-selection-vote.module");
const file_module_1 = require("../file/file.module");
const user_model_1 = require("../user/user.model");
const balance_game_selection_vote_model_1 = require("../balance-game-selection-vote/balance-game-selection-vote.model");
let BalanceGameModule = class BalanceGameModule {
};
BalanceGameModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([balance_game_model_1.BalanceGame, user_model_1.User, balance_game_selection_vote_model_1.BalanceGameSelectionVote]),
            balance_game_keyword_module_1.BalanceGameKeywordModule,
            balance_game_selection_module_1.BalanceGameSelectionModule,
            balance_game_selection_vote_module_1.BalanceGameSelectionVoteModule,
            file_module_1.FileModule,
        ],
        providers: [balance_game_resolver_1.BalanceGameResolver, balance_game_service_1.BalanceGameService],
        exports: [balance_game_service_1.BalanceGameService],
    })
], BalanceGameModule);
exports.BalanceGameModule = BalanceGameModule;
//# sourceMappingURL=balance-game.module.js.map