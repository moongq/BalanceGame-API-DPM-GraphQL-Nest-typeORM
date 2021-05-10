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
import { Header, UseGuards } from '@nestjs/common';
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

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService, private readonly userProfileService: UserProfileService) {}

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
    if (loginUserInput.socialType === "kakao") {
      // kakao 토큰인증 
      const kakaoUserData = await this.userService.kakaoToken(loginUserInput.socialKey);
      let status = "LOGIN";
      let userId;
      if (kakaoUserData.result !== "FAIL") {
        // 가입된 유저인지 체크 
        const getUser = await this.userService.getUserByOauth(kakaoUserData.kakaoId, loginUserInput.socialType);
        
        if (!getUser) {
          // 가입한 적이 없으면 저장 
          const user = await this.userService.oauthCreateUser({
            socialId: kakaoUserData.kakaoId,
            platformType: loginUserInput.socialType,
            profile: {
              email: kakaoUserData.kakaoEmail,
              nickname: "",
              userImage: ""
            }
          })
          status = "REGISTER";
          userId = user.id;
        } else if (getUser.profile.nickname === "") {
          status = "NOTYET";
          userId = getUser.id
        } else {
          userId = getUser.id;
        }
      }
      const jwtToken = this.userService.createToken({
        socailId: kakaoUserData.kakaoId,
        userId: userId
      });

      userOauthResponse = {
        jwt: jwtToken,
        email: kakaoUserData.kakaoEmail,
        status: status
      }

      return userOauthResponse;
    }
  }

  // 닉네임 업데이트 
  @Mutation((returns) => String)
  @UseGuards(new AuthGuard())
  async setProfile(
    @Args('setProfileInput') setProfileInput: SetProfileInput,
    @Token('user') token: UserJwt) {
      const userData = await this.userService.findOne(token.userId);
      await this.userProfileService.update(userData.profile.id, setProfileInput.nickname);
      return "SUCCESS";
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
}
