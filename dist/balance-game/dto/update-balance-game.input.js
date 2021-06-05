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
exports.UpdateBalanceGameInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const create_balance_game_keyword_input_1 = require("../../balance-game-keyword/dto/create-balance-game-keyword.input");
const update_balance_game_selection_input_1 = require("../../balance-game-selection/dto/update-balance-game-selection.input");
let UpdateBalanceGameInput = class UpdateBalanceGameInput {
    static _GRAPHQL_METADATA_FACTORY() {
        return { balanceGameId: { nullable: false, type: () => String }, description: { nullable: true, type: () => String }, balanceGameSelections: { nullable: true, type: () => Object }, balanceGameKeywords: { nullable: true, type: () => Object } };
    }
};
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], UpdateBalanceGameInput.prototype, "balanceGameId", void 0);
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], UpdateBalanceGameInput.prototype, "description", void 0);
__decorate([
    graphql_1.Field(() => [update_balance_game_selection_input_1.UpdateBalanceGameSelectionInput]),
    __metadata("design:type", Array)
], UpdateBalanceGameInput.prototype, "balanceGameSelections", void 0);
__decorate([
    graphql_1.Field(() => [create_balance_game_keyword_input_1.CreateBalanceGameKeywordInput]),
    __metadata("design:type", Array)
], UpdateBalanceGameInput.prototype, "balanceGameKeywords", void 0);
UpdateBalanceGameInput = __decorate([
    graphql_1.InputType()
], UpdateBalanceGameInput);
exports.UpdateBalanceGameInput = UpdateBalanceGameInput;
//# sourceMappingURL=update-balance-game.input.js.map