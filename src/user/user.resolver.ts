import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.model';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}


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
  createUser(@Args('createUserInput') createUserInput: CreateUserInput): Promise<User> {
    return this.userService.create(createUserInput);
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
