"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProfileModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_profile_model_1 = require("./user-profile.model");
const user_profile_resolver_1 = require("./user-profile.resolver");
const user_profile_service_1 = require("./user-profile.service");
let UserProfileModule = class UserProfileModule {
};
UserProfileModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_profile_model_1.UserProfile])],
        providers: [user_profile_resolver_1.UserProfileResolver, user_profile_service_1.UserProfileService],
        exports: [user_profile_service_1.UserProfileService],
    })
], UserProfileModule);
exports.UserProfileModule = UserProfileModule;
//# sourceMappingURL=user-profile.module.js.map