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
exports.LoginUserInput = void 0;
const graphql_1 = require("@nestjs/graphql");
let LoginUserInput = class LoginUserInput {
    static _GRAPHQL_METADATA_FACTORY() {
        return { socialKey: { nullable: false, type: () => String }, socialType: { nullable: false, type: () => String } };
    }
};
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], LoginUserInput.prototype, "socialKey", void 0);
__decorate([
    graphql_1.Field({ description: "kakao or naver" }),
    __metadata("design:type", String)
], LoginUserInput.prototype, "socialType", void 0);
LoginUserInput = __decorate([
    graphql_1.InputType()
], LoginUserInput);
exports.LoginUserInput = LoginUserInput;
//# sourceMappingURL=login-user.input.js.map