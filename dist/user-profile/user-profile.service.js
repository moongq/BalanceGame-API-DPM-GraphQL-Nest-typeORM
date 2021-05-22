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
exports.UserProfileService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_profile_model_1 = require("./user-profile.model");
let UserProfileService = class UserProfileService {
    constructor(userProfileRepository) {
        this.userProfileRepository = userProfileRepository;
    }
    async create(createUserProfileInput) {
        const userProfileRepository = typeorm_2.getRepository(user_profile_model_1.UserProfile);
        const userProfile = new user_profile_model_1.UserProfile();
        userProfile.email = createUserProfileInput.email;
        userProfile.nickname = createUserProfileInput.nickname;
        userProfile.userImage = createUserProfileInput.userImage;
        await userProfileRepository.save(userProfile);
        return userProfile;
    }
    findAll() {
        const userProfiles = this.userProfileRepository.find({});
        return userProfiles;
    }
    findOne(id) {
        const userProfiles = this.userProfileRepository.findOne({
            id: id,
        });
        return userProfiles;
    }
    async update(id, nickname, email) {
        await this.userProfileRepository.update({
            id: id,
        }, {
            nickname: nickname,
            email: email,
        });
        return this.findOne(id);
    }
};
UserProfileService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_profile_model_1.UserProfile)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserProfileService);
exports.UserProfileService = UserProfileService;
//# sourceMappingURL=user-profile.service.js.map