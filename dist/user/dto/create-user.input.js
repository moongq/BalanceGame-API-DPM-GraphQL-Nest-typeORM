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
exports.CreateUserInput = void 0;
const eager_import_0 = require("../../user-profile/dto/create-user-profile.input");
const graphql_1 = require("@nestjs/graphql");
const create_user_profile_input_1 = require("../../user-profile/dto/create-user-profile.input");
let CreateUserInput = class CreateUserInput {
    static _GRAPHQL_METADATA_FACTORY() {
        return { socialId: { nullable: false, type: () => String }, platformType: { nullable: true, type: () => String }, profile: { nullable: false, type: () => require("../../user-profile/dto/create-user-profile.input").CreateUserProfileInput } };
    }
};
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], CreateUserInput.prototype, "socialId", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], CreateUserInput.prototype, "platformType", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", create_user_profile_input_1.CreateUserProfileInput)
], CreateUserInput.prototype, "profile", void 0);
CreateUserInput = __decorate([
    graphql_1.InputType()
], CreateUserInput);
exports.CreateUserInput = CreateUserInput;
//# sourceMappingURL=create-user.input.js.map