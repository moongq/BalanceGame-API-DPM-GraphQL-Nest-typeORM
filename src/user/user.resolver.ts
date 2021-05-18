import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveProperty,
  Parent,
  ResolveField,
  Context
} from '@nestjs/graphql';
import { Header, UseGuards, HttpStatus, HttpException } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.model';
import { CreateUserInput } from './dto/create-user.input';
import { LoginUserInput } from './dto/login-user.input';
import { LoginUserOutput } from './dto/login-user.output';
import { SetProfileInput } from './dto/set-profile.input';
import { UserJwt } from './dto/user-jwt';
import { UserProfile } from '../user-profile/user-profile.model';
import { UserProfileService } from '../user-profile/user-profile.service';
import { AuthGuard } from './auth.guard';
import { Token } from './lib/user.decorator';
import * as jwt from 'jsonwebtoken';
import { BalanceGame } from "../balance-game/balance-game.model";
import { BalanceGameService } from "../balance-game/balance-game.service";

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly userProfileService: UserProfileService,
    private readonly balanceGameService: BalanceGameService
  ) {}

  /** Usage
  mutation {
    createUser (createUserInput: {id: "123", social_id:"fb", platform_type:"fb"}) {
     id,
     social_id,
     platform_type
   }
 }
  */
  @Mutation((returns) => User)
  async createUser(@Args("createUserInput") createUserInput: CreateUserInput): Promise<User> {
    console.log(createUserInput);
    const user = await this.userService.create(createUserInput);
    return user;
  }

  @Mutation((returns) => LoginUserOutput)
  async login(
    @Args('loginUserInput') loginUserInput: LoginUserInput) {
    let userOauthResponse;
    let socailUserData;
    let status = "LOGIN";
    let userId;
    if (loginUserInput.socialType === "kakao") {
      // kakao 토큰인증 
      socailUserData = await this.userService.kakaoToken(loginUserInput.socialKey);
      
    } else if (loginUserInput.socialType === "naver") {
      // naver 토큰 인증
      socailUserData = await this.userService.naverToken(loginUserInput.socialKey);
    } else {
      throw new HttpException("socialType Error ", HttpStatus.UNPROCESSABLE_ENTITY);
    }
    if (socailUserData.result !== "FAIL") {
      // 가입된 유저인지 체크 
      const getUser = await this.userService.getUserByOauth(socailUserData.socialId, loginUserInput.socialType);
      
      if (!getUser) {
        // 가입한 적이 없으면 저장 
        const user = await this.userService.oauthCreateUser({
          socialId: socailUserData.socialId,
          platformType: loginUserInput.socialType,
          profile: {
            email: socailUserData.socialEmail,
            nickname: "닉네임 난수 예정",
            userImage: ""
          }
        })
        status = "REGISTER";
        userId = user.id;
      } else {
        userId = getUser.id;
      }
    }
    const jwtToken = this.userService.createToken({
      socailId: socailUserData.socialId,
      userId: userId
    });

    userOauthResponse = {
      jwt: jwtToken,
      email: socailUserData.socialEmail,
      status: status
    }

    return userOauthResponse;
  }

  // 프로필 업데이트 
  @Mutation((returns) => UserProfile)
  @UseGuards(new AuthGuard())
  async setProfile(
    @Args('setProfileInput') setProfileInput: SetProfileInput,
    @Token('user') token: UserJwt) {
      const userData = await this.userService.findOne(token.userId);
      const userProfile = await this.userProfileService.update(userData.profile.id, setProfileInput.nickname, setProfileInput.email);
      return userProfile;
    }

  @Query((returns) => User, { name: 'mypage' })
  @UseGuards(new AuthGuard())
  async myPage(@Token('user') token: UserJwt) {
    const userData = await this.userService.findOne(token.userId);
    
    return userData;
  }


  // @ResolveField()
  // async userProfile(@Parent() parent): Promise<UserProfile> {
  //   console.log(parent)
  //   const { email, nickname, user_image} = parent;
  //   return await this.userProfileService.create({ email, nickname, user_image})
  // }

  /** Usage
{
  user {
    id
    social_id,
    platform_type
  }
}
   */
  @Query((returns) => [User], { name: "users" })
  async findAll() {
    return this.userService.findAll();
  }

  @ResolveField(() => [BalanceGame])
  async balanceGames(@Parent() parent): Promise<BalanceGame[]> {
    const { id } = parent;
    console.log("id :>> ", id);
    return this.balanceGameService.findAllByUserID(id);
  }
}
