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
exports.UserResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("./guards/auth.guard");
const user_decorator_1 = require("./lib/user.decorator");
const user_model_1 = require("./user.model");
const user_service_1 = require("./user.service");
const create_user_input_1 = require("./dto/create-user.input");
const login_user_input_1 = require("./dto/login-user.input");
const login_user_output_1 = require("./dto/login-user.output");
const set_profile_input_1 = require("./dto/set-profile.input");
const user_jwt_1 = require("./dto/user-jwt");
const balance_game_service_1 = require("../balance-game/balance-game.service");
const user_profile_model_1 = require("../user-profile/user-profile.model");
const user_profile_service_1 = require("../user-profile/user-profile.service");
let UserResolver = class UserResolver {
    constructor(userService, userProfileService, balanceGameService) {
        this.userService = userService;
        this.userProfileService = userProfileService;
        this.balanceGameService = balanceGameService;
    }
    async createUser(createUserInput) {
        console.log(createUserInput);
        const user = await this.userService.create(createUserInput);
        return user;
    }
    async login(loginUserInput) {
        let socialUserData;
        let status = "LOGIN";
        let userId;
        if (loginUserInput.socialType === "kakao") {
            socialUserData = await this.userService.kakaoToken(loginUserInput.socialKey);
        }
        else if (loginUserInput.socialType === "naver") {
            socialUserData = await this.userService.naverToken(loginUserInput.socialKey);
        }
        else {
            throw new common_1.HttpException("socialType Error ", common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        }
        if (socialUserData.result !== "FAIL") {
            const getUser = await this.userService.getUserByOauth(socialUserData.socialId, loginUserInput.socialType);
            if (!getUser) {
                const autoNickname = await this.userService.createNickname();
                const user = await this.userService.oauthCreateUser({
                    socialId: socialUserData.socialId,
                    platformType: loginUserInput.socialType,
                    profile: {
                        email: socialUserData.socialEmail,
                        nickname: autoNickname,
                        userImage: "",
                    },
                });
                status = "REGISTER";
                userId = user.id;
            }
            else {
                userId = getUser.id;
            }
        }
        const jwtToken = this.userService.createToken({
            socialId: socialUserData.socialId,
            userId: userId,
        });
        const userOauthResponse = {
            jwt: jwtToken,
            email: socialUserData.socialEmail,
            status: status,
        };
        return userOauthResponse;
    }
    async setProfile(setProfileInput, token) {
        const userData = await this.userService.findOne(token.userId);
        const userProfile = await this.userProfileService.update(userData.profile.id, setProfileInput.nickname, setProfileInput.email);
        return userProfile;
    }
    async myPage(token) {
        const userData = await this.userService.findOne(token.userId);
        return userData;
    }
    async findAll() {
        return this.userService.findAll();
    }
};
__decorate([
    graphql_1.Mutation((returns) => user_model_1.User),
    __param(0, graphql_1.Args("createUserInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_input_1.CreateUserInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "createUser", null);
__decorate([
    graphql_1.Mutation((returns) => login_user_output_1.LoginUserOutput),
    __param(0, graphql_1.Args("loginUserInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_user_input_1.LoginUserInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "login", null);
__decorate([
    graphql_1.Mutation((returns) => user_profile_model_1.UserProfile),
    common_1.UseGuards(new auth_guard_1.AuthGuard()),
    __param(0, graphql_1.Args("setProfileInput")), __param(1, user_decorator_1.Token("user")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [set_profile_input_1.SetProfileInput, user_jwt_1.UserJwt]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "setProfile", null);
__decorate([
    graphql_1.Query((returns) => user_model_1.User, { name: "mypage" }),
    common_1.UseGuards(new auth_guard_1.AuthGuard()),
    __param(0, user_decorator_1.Token("user")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_jwt_1.UserJwt]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "myPage", null);
__decorate([
    graphql_1.Query((returns) => [user_model_1.User], { name: "users" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "findAll", null);
UserResolver = __decorate([
    graphql_1.Resolver(() => user_model_1.User),
    __metadata("design:paramtypes", [user_service_1.UserService,
        user_profile_service_1.UserProfileService,
        balance_game_service_1.BalanceGameService])
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=user.resolver.js.map