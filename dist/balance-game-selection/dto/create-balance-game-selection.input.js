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
exports.CreateBalanceGameSelectionInput = void 0;
const graphql_1 = require("@nestjs/graphql");
var order;
(function (order) {
    order[order["test1"] = 0] = "test1";
    order[order["test2"] = 1] = "test2";
})(order || (order = {}));
let CreateBalanceGameSelectionInput = class CreateBalanceGameSelectionInput {
    static _GRAPHQL_METADATA_FACTORY() {
        return { balanceGameId: { nullable: true, type: () => String }, description: { nullable: false, type: () => String }, textColor: { nullable: true, type: () => String }, backgroundColor: { nullable: true, type: () => String }, backgroundImage: { nullable: true, type: () => String }, order: { nullable: false, type: () => Number } };
    }
};
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], CreateBalanceGameSelectionInput.prototype, "balanceGameId", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], CreateBalanceGameSelectionInput.prototype, "description", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], CreateBalanceGameSelectionInput.prototype, "textColor", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], CreateBalanceGameSelectionInput.prototype, "backgroundColor", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], CreateBalanceGameSelectionInput.prototype, "backgroundImage", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", Number)
], CreateBalanceGameSelectionInput.prototype, "order", void 0);
CreateBalanceGameSelectionInput = __decorate([
    graphql_1.InputType()
], CreateBalanceGameSelectionInput);
exports.CreateBalanceGameSelectionInput = CreateBalanceGameSelectionInput;
//# sourceMappingURL=create-balance-game-selection.input.js.map