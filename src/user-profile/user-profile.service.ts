import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserProfileInput } from './dto/create-user-profile.input';
import { UpdateUserProfileInput } from './dto/update-user-profile.input';
import { UserProfile } from './user-profile.model';

@Injectable()
export class UserProfileService {

  constructor(
    @InjectRepository(UserProfile)
    private userRepository: Repository<UserProfile>,
  ) {}

  
  create(createUserProfileInput: CreateUserProfileInput) {
    const newUserProfile = this.userRepository.create(createUserProfileInput);
    
    return this.userRepository.save(newUserProfile);
  }

  findAll() {
    const userProfiles = this.userRepository.find({});

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
