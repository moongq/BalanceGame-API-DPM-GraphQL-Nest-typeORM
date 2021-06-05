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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const axios_1 = require("axios");
const date_fns_1 = require("date-fns");
const jwt = require("jsonwebtoken");
const typeorm_2 = require("typeorm");
const user_model_1 = require("./user.model");
const user_profile_service_1 = require("../user-profile/user-profile.service");
let UserService = class UserService {
    constructor(userRepository, userProfileService) {
        this.userRepository = userRepository;
        this.userProfileService = userProfileService;
    }
    async create(data) {
        const userProfile = await this.userProfileService.create(data.profile);
        const newUser = this.userRepository.create({
            socialId: data.socialId,
            platformType: data.platformType,
            profile: userProfile,
        });
        console.log(newUser);
        return await this.userRepository.save(newUser);
    }
    async createNickname() {
        const num = await this.userRepository.count({});
        const toTime = date_fns_1.format(new Date(), "MMddHHmm");
        const autoNickname = "tomatto" + toTime + num;
        return autoNickname;
    }
    async oauthCreateUser(data) {
        const userProfile = await this.userProfileService.create(data.profile);
        const newUser = this.userRepository.create({
            socialId: data.socialId,
            platformType: data.platformType,
            profile: userProfile,
        });
        return await this.userRepository.save(newUser);
    }
    async kakaoToken(token) {
        var _a;
        try {
            const kakaoRes = await axios_1.default({
                method: "GET",
                url: "https://kapi.kakao.com/v2/user/me",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = kakaoRes.data;
            const kakaoId = data.id;
            const kakaoEmail = (_a = data.kakao_account) === null || _a === void 0 ? void 0 : _a.email;
            return {
                result: "SUCCESS",
                data: data,
                socialId: kakaoId,
                socialEmail: kakaoEmail,
            };
        }
        catch (e) {
            console.log(e);
            return {
                result: "FAIL",
            };
        }
    }
    async naverToken(token) {
        try {
            const naverRes = await axios_1.default({
                method: "GET",
                url: "https://openapi.naver.com/v1/nid/me",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = naverRes.data;
            console.log("naver token data ", data);
            const naverId = data.response.id;
            const naverEmail = data.response.email;
            return {
                result: "SUCCESS",
                data: data,
                socialId: naverId,
                socialEmail: naverEmail,
            };
        }
        catch (e) {
            console.log(e);
            return {
                result: "FAIL",
            };
        }
    }
    createToken(user) {
        return jwt.sign(user, process.env.JWT_SECRET_KEY, { expiresIn: "365d" });
    }
    async getUserByOauth(socialId, platformType) {
        return await this.userRepository.findOne({
            socialId: socialId,
            platformType: platformType,
        });
    }
    async findAll() {
        const Users = await this.userRepository.find({});
        return Users;
    }
    async findOne(userId) {
        const user = this.userRepository.findOne({
            where: {
                id: userId,
            },
            relations: ["profile", "balanceGames", "balanceGameSelectionVotes"],
        });
        return user;
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_model_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        user_profile_service_1.UserProfileService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map