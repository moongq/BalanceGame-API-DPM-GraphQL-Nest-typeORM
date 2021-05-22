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
exports.BalanceGamesStateInput = void 0;
const graphql_1 = require("@nestjs/graphql");
let BalanceGamesStateInput = class BalanceGamesStateInput {
    static _GRAPHQL_METADATA_FACTORY() {
        return { limit: { nullable: false, type: () => Number }, offset: { nullable: false, type: () => Number } };
    }
};
__decorate([
    graphql_1.Field({ description: "밸런스 게임 나오는 갯수" }),
    __metadata("design:type", Number)
], BalanceGamesStateInput.prototype, "limit", void 0);
__decorate([
    graphql_1.Field({ description: "skip할 밸런스 게임 갯수(현재 웹에 나와있는 밸런스 게임 갯수 넣으시면 됩니다." }),
    __metadata("design:type", Number)
], BalanceGamesStateInput.prototype, "offset", void 0);
BalanceGamesStateInput = __decorate([
    graphql_1.InputType()
], BalanceGamesStateInput);
exports.BalanceGamesStateInput = BalanceGamesStateInput;
//# sourceMappingURL=balance-game-state.input.js.map