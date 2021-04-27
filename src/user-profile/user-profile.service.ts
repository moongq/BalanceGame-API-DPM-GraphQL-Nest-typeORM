import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserProfileInput } from './dto/create-user-profile.input';
import { UserProfile } from './user-profile.model';

@Injectable()
export class UserProfileService {

  constructor(
    @InjectRepository(UserProfile)
    private userProfileRepository: Repository<UserProfile>,
  ) {}

  
  create(createUserProfileInput: CreateUserProfileInput): Promise<UserProfile> {
    const newUserProfile = this.userProfileRepository.create(createUserProfileInput);
    console.log(newUserProfile)
    return this.userProfileRepository.save(newUserProfile);
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
