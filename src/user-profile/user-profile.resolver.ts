import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserProfileService } from './user-profile.service';
import { UserProfile } from './user-profile.model';
import { CreateUserProfileInput } from './dto/create-user-profile.input';
import { UpdateUserProfileInput } from './dto/update-user-profile.input';

@Resolver(() => UserProfile)
export class UserProfileResolver {
  constructor(private readonly userProfileService: UserProfileService) {}

  // @Mutation(() => UserProfile)
  // createUserProfile(@Args('createUserProfileInput') createUserProfileInput: CreateUserProfileInput) {
  //   return this.userProfileService.create(createUserProfileInput);
  // }

  // @Query(() => [UserProfile], { name: 'userProfile' })
  // findAll() {
  //   return this.userProfileService.findAll();
  // }

  // @Query(() => UserProfile, { name: 'userProfile' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.userProfileService.findOne(id);
  // }

  // @Mutation(() => UserProfile)
  // updateUserProfile(@Args('updateUserProfileInput') updateUserProfileInput: UpdateUserProfileInput) {
  //   return this.userProfileService.update(updateUserProfileInput.id, updateUserProfileInput);
  // }

  // @Mutation(() => UserProfile)
  // removeUserProfile(@Args('id', { type: () => Int }) id: number) {
  //   return this.userProfileService.remove(id);
  // }
}
