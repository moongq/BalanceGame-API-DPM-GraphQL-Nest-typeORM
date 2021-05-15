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
    private userProfileRepository: Repository<UserProfile>
  ) {}

  async create(createUserProfileInput: CreateUserProfileInput): Promise<UserProfile> {
    const userProfileRepository = getRepository(UserProfile);
    const userProfile = new UserProfile();
    
    userProfile.email = createUserProfileInput.email;
    // userProfile.nickname = createUserProfileInput.nickname;
    // userProfile.userImage = createUserProfileInput.userImage;
    await userProfileRepository.save(userProfile);
    console.log("???");
    return userProfile;
  }

  findAll(): Promise<UserProfile[]> {
    const userProfiles = this.userProfileRepository.find({});

    return userProfiles;
  }


  findOne(id: string): Promise<UserProfile> {
    const userProfiles = this.userProfileRepository.findOne({
      id: id
    });

    return userProfiles;
  }

  async update(id: string, nickname: string, email: string) {
    await this.userProfileRepository.update({
      id: id
    }, {
      nickname: nickname,
      email: email
    })

    return this.findOne(id);
  }

  // remove(id: number) {
  //   return `This action removes a #${id} userProfile`;
  // }
}
