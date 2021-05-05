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
import { UserProfile } from '../user-profile/user-profile.model';
import { UserProfileService } from '../user-profile/user-profile.service';
import { AuthGuard } from './auth.guard';
import { Token } from './lib/user.decorator';


@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly userProfileService: UserProfileService
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
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput
  ): Promise<User> {
    console.log(createUserInput);
    const user = await this.userService.create(createUserInput);
    return user;
  }

  @Mutation((returns) => LoginUserOutput)
  async login(
    @Args('loginUserInput') loginUserInput: LoginUserInput) {
    console.log("test", loginUserInput);
    
    const userOauthTest = await this.userService.kakaoToken(loginUserInput.socialKey);
    console.log(userOauthTest);
    return userOauthTest;
  }

  @Query((returns) => User, { name: 'mypage' })
  @UseGuards(new AuthGuard())
  async myPage(@Token('user') token: String) {
    console.log(token);
    const userData = await this.userService.findOne(token);
    console.log(userData);
    
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

  @Query((returns) => [User], { name: 'user' })
  findAll() {
    return this.userService.findAll();
  }
}
