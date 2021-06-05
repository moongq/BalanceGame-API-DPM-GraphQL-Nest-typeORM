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
exports.UpdateBalanceGameSelectionInput = void 0;
const graphql_1 = require("@nestjs/graphql");
let UpdateBalanceGameSelectionInput = class UpdateBalanceGameSelectionInput {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { nullable: false, type: () => String }, description: { nullable: true, type: () => String }, textColor: { nullable: true, type: () => String }, backgroundColor: { nullable: true, type: () => String }, backgroundImage: { nullable: true, type: () => String }, order: { nullable: true, type: () => Number } };
    }
};
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], UpdateBalanceGameSelectionInput.prototype, "id", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], UpdateBalanceGameSelectionInput.prototype, "description", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], UpdateBalanceGameSelectionInput.prototype, "textColor", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], UpdateBalanceGameSelectionInput.prototype, "backgroundColor", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], UpdateBalanceGameSelectionInput.prototype, "backgroundImage", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", Number)
], UpdateBalanceGameSelectionInput.prototype, "order", void 0);
UpdateBalanceGameSelectionInput = __decorate([
    graphql_1.InputType()
], UpdateBalanceGameSelectionInput);
exports.UpdateBalanceGameSelectionInput = UpdateBalanceGameSelectionInput;
//# sourceMappingURL=update-balance-game-selection.input.js.map