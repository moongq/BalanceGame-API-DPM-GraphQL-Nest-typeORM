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
exports.CreateNotificationInput = void 0;
const graphql_1 = require("@nestjs/graphql");
let CreateNotificationInput = class CreateNotificationInput {
    static _GRAPHQL_METADATA_FACTORY() {
        return { userId: { nullable: false, type: () => String }, balanceGameId: { nullable: false, type: () => String }, commentId: { nullable: true, type: () => String }, content: { nullable: false, type: () => String }, replyNickname: { nullable: true, type: () => String } };
    }
};
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], CreateNotificationInput.prototype, "userId", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], CreateNotificationInput.prototype, "balanceGameId", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], CreateNotificationInput.prototype, "commentId", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], CreateNotificationInput.prototype, "content", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], CreateNotificationInput.prototype, "replyNickname", void 0);
CreateNotificationInput = __decorate([
    graphql_1.InputType()
], CreateNotificationInput);
exports.CreateNotificationInput = CreateNotificationInput;
//# sourceMappingURL=create-notification.input.js.map