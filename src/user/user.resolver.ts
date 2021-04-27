import { Resolver, Query, Mutation, Args, Int, ResolveProperty, Parent, ResolveField } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.model';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserProfile } from '../user-profile/user-profile.model';
import { UserProfileService } from 'src/user-profile/user-profile.service';

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
    return await this.userService.create(createUserInput);
  }

  @ResolveField()
  async profile(@Parent() parent): Promise<UserProfile> {
    const { user_id, email, nickname, user_image} = parent
    return await this.userProfileService.create({user_id, email, nickname, user_image})
  }

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
