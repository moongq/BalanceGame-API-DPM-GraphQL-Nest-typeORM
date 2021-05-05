import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserProfileService } from 'src/user-profile/user-profile.service';
import { Repository } from 'typeorm';
import axios, { AxiosPromise } from 'axios';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './user.model';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private userProfileService: UserProfileService
  ) {}

  async create(data: CreateUserInput): Promise<User> {
    const userProfile = await this.userProfileService.create(data.profile);
    const newUser = this.userRepository.create({
      socialId: data.socialId,
      platformType: data.platformType,
      profile: userProfile,
    });
    console.log(newUser);

    return await this.userRepository.save(newUser);
  }

  async oauthCreateUser(data: CreateUserInput): Promise<User> {
    const userProfile = await this.userProfileService.create(data.profile);
    const newUser = this.userRepository.create({
      socialId: data.socialId,
      platformType: data.platformType,
      profile: userProfile,
    });

    return await this.userRepository.save(newUser);
  }
  
  async kakaoToken(token: String) {
    try {
      const kakaoRes = await axios({
        method: "GET",
        url: 'https://kapi.kakao.com/v2/user/me',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // console.log(kakaoRes);
      const data = kakaoRes.data;
      const kakaoId = data.id;
      const kakaoEmail = data.kakao_account.email;
      
      if (!this.getUserByOauth(kakaoId, "kakao")) {
        console.log("createUser");
        await this.oauthCreateUser({
          socialId: kakaoId,
          platformType: "kakao",
          profile: {
            email: kakaoEmail,
            nickname: "",
            userImage: ""
          }
        })  
      }
      const jwtToken = jwt.sign(kakaoId, 'secret');

      return {
        jwt: jwtToken,
        email: kakaoEmail
      };
    } catch (e) {
      console.log(e);
      return "";
    }
    
  }

  createToken(user: User) {
    return jwt.sign(user, "secret");
  }

  getUserByOauth(socialId: string, platformType: string) {
    return this.userRepository.findOne({
      socialId: socialId,
      platformType: platformType
    })
  }

  async findAll() {
    const Users = this.userRepository.find({});

    return Users;
  }

  async findOne(userId: String) {
    const user = this.userRepository.findOne({
      where: {
        socialId: userId
      }
    })

    return user;
  }


  // create(createUserInput: CreateUserInput) {
  //   return 'This action adds a new user';
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  // update(id: number, updateUserInput: UpdateUserInput) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
