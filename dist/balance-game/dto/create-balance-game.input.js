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
exports.CreateBalanceGameInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const create_balance_game_keyword_input_1 = require("../../balance-game-keyword/dto/create-balance-game-keyword.input");
const create_balance_game_selection_input_1 = require("../../balance-game-selection/dto/create-balance-game-selection.input");
let CreateBalanceGameInput = class CreateBalanceGameInput {
    static _GRAPHQL_METADATA_FACTORY() {
        return { description: { nullable: false, type: () => String }, balanceGameSelections: { nullable: false, type: () => Object }, balanceGameKeywords: { nullable: false, type: () => Object } };
    }
};
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], CreateBalanceGameInput.prototype, "description", void 0);
__decorate([
    graphql_1.Field(() => [create_balance_game_selection_input_1.CreateBalanceGameSelectionInput]),
    __metadata("design:type", Array)
], CreateBalanceGameInput.prototype, "balanceGameSelections", void 0);
__decorate([
    graphql_1.Field(() => [create_balance_game_keyword_input_1.CreateBalanceGameKeywordInput]),
    __metadata("design:type", Array)
], CreateBalanceGameInput.prototype, "balanceGameKeywords", void 0);
CreateBalanceGameInput = __decorate([
    graphql_1.InputType()
], CreateBalanceGameInput);
exports.CreateBalanceGameInput = CreateBalanceGameInput;
//# sourceMappingURL=create-balance-game.input.js.map