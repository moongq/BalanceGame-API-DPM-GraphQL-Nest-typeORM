import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserProfileInput } from './dto/create-user-profile.input';
import { UserProfile } from './user-profile.model';
import { getRepository } from 'typeorm';

@Injectable()
export class UserProfileService {

  constructor(
    @InjectRepository(UserProfile)
    private userProfileRepository: Repository<UserProfile>,
  ) {}

  
  async create(createUserProfileInput: CreateUserProfileInput): Promise<UserProfile> {
    const userProfileRepository = getRepository(UserProfile);
    const userProfile = new UserProfile();
    
    userProfile.email = createUserProfileInput.email;
    userProfile.nickname = createUserProfileInput.nickname;
    userProfile.userImage = createUserProfileInput.userImage;
    await userProfileRepository.save(userProfile);
    return userProfile;
  }

  findAll(): Promise<UserProfile[]> {
    const userProfiles = this.userProfileRepository.find({});

    return userProfiles;
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} userProfile`;
  // }

  // update(id: number, updateUserProfileInput: UpdateUserProfileInput) {
  //   return `This action updates a #${id} userProfile`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} userProfile`;
  // }
}
