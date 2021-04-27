import { Resolver, Query, Mutation, Args, Int, ResolveProperty, Parent, ResolveField } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.model';
import { CreateUserInput } from './dto/create-user.input';
import { UserProfile } from '../user-profile/user-profile.model';
import { UserProfileService } from '../user-profile/user-profile.service';

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
  @Mutation(returns => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput): Promise<User> {
    console.log(createUserInput)
    const user = await this.userService.create(createUserInput);
    return user;
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
  @Query(returns => [User], { name: 'user' })
  findAll() {
    return this.userService.findAll();
  }
}
