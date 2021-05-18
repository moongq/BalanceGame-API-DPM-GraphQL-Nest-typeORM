
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserProfileService } from 'src/user-profile/user-profile.service';
import { Repository } from 'typeorm';
import axios, { AxiosPromise } from 'axios';
import { CreateUserInput } from './dto/create-user.input';
import { UserJwt } from './dto/user-jwt';
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
      const data = kakaoRes.data;
      const kakaoId = data.id;
      const kakaoEmail = data.kakao_account?.email;

      return {
        result: "SUCCESS",
        data: data,
        socialId: kakaoId,
        socialEmail: kakaoEmail
      };
    } catch (e) {
      console.log(e);
      return {
        result: "FAIL"
      };
    }
  }

  async naverToken(token: String) {
    try {
      const naverRes = await axios({
        method: "GET",
        url: 'https://openapi.naver.com/v1/nid/me',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = naverRes.data;
      console.log("naver token data ", data);
      const naverId = data.response.id;
      const naverEmail = data.response.email;

      return {
        result: "SUCCESS",
        data: data,
        socialId: naverId,
        socialEmail: naverEmail
      };
    } catch(e) {
      console.log(e);
      return {
        result: "FAIL"
      };
    }
  }

  createToken(user: UserJwt) {
    return jwt.sign(
      user, 
      process.env.JWT_SECRET_KEY,
      { expiresIn: '365d' });
  }

  async getUserByOauth(socialId: string, platformType: string) {
    
    return await this.userRepository.findOne({
      socialId: socialId,
      platformType: platformType
    })
  }

  async findAll() {
    const Users = await this.userRepository.find({});

    return Users;
  }

  async findOne(userId: String) {
    const user = this.userRepository.findOne({
      where: {
        id: userId
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

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
