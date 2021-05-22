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
exports.SetProfileInput = void 0;
const graphql_1 = require("@nestjs/graphql");
let SetProfileInput = class SetProfileInput {
    static _GRAPHQL_METADATA_FACTORY() {
        return { nickname: { nullable: false, type: () => String }, email: { nullable: false, type: () => String } };
    }
};
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], SetProfileInput.prototype, "nickname", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], SetProfileInput.prototype, "email", void 0);
SetProfileInput = __decorate([
    graphql_1.InputType()
], SetProfileInput);
exports.SetProfileInput = SetProfileInput;
//# sourceMappingURL=set-profile.input.js.map