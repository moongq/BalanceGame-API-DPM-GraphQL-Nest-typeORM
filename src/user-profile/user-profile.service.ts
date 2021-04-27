import { Injectable } from '@nestjs/common';
import { CreateUserProfileInput } from './dto/create-user-profile.input';
import { UpdateUserProfileInput } from './dto/update-user-profile.input';

@Injectable()
export class UserProfileService {
  create(createUserProfileInput: CreateUserProfileInput) {
    return 'This action adds a new userProfile';
  }

  findAll() {
    return `This action returns all userProfile`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userProfile`;
  }

  update(id: number, updateUserProfileInput: UpdateUserProfileInput) {
    return `This action updates a #${id} userProfile`;
  }

  remove(id: number) {
    return `This action removes a #${id} userProfile`;
  }
}
