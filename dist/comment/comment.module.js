"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const comment_model_1 = require("./comment.model");
const comment_resolver_1 = require("./comment.resolver");
const comment_service_1 = require("./comment.service");
const balance_game_model_1 = require("../balance-game/balance-game.model");
const balance_game_selection_vote_module_1 = require("../balance-game-selection-vote/balance-game-selection-vote.module");
let CommentModule = class CommentModule {
};
CommentModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([comment_model_1.Comment, balance_game_model_1.BalanceGame]), balance_game_selection_vote_module_1.BalanceGameSelectionVoteModule],
        providers: [comment_resolver_1.CommentResolver, comment_service_1.CommentService],
        exports: [],
    })
], CommentModule);
exports.CommentModule = CommentModule;
//# sourceMappingURL=comment.module.js.map