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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProfileResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const user_profile_model_1 = require("./user-profile.model");
const user_profile_service_1 = require("./user-profile.service");
const create_user_profile_input_1 = require("./dto/create-user-profile.input");
let UserProfileResolver = class UserProfileResolver {
    constructor(userProfileService) {
        this.userProfileService = userProfileService;
    }
    async createUserProfile(createUserProfileInput) {
        return await this.userProfileService.create(createUserProfileInput);
    }
};
__decorate([
    graphql_1.Mutation(() => user_profile_model_1.UserProfile),
    __param(0, graphql_1.Args("createUserProfileInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_profile_input_1.CreateUserProfileInput]),
    __metadata("design:returntype", Promise)
], UserProfileResolver.prototype, "createUserProfile", null);
UserProfileResolver = __decorate([
    graphql_1.Resolver(() => user_profile_model_1.UserProfile),
    __metadata("design:paramtypes", [user_profile_service_1.UserProfileService])
], UserProfileResolver);
exports.UserProfileResolver = UserProfileResolver;
//# sourceMappingURL=user-profile.resolver.js.map