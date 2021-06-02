import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import axios from "axios";
import { format } from "date-fns";
import * as jwt from "jsonwebtoken";
import { Repository } from "typeorm";

import { User } from "./user.model";

import { CreateUserInput } from "./dto/create-user.input";
import { UserJwt } from "./dto/user-jwt";

import { UserProfileService } from "../user-profile/user-profile.service";

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

  async createNickname() {
    const num = await this.userRepository.count({});
    const toTime = format(new Date(), "MMddHHmm");
    const autoNickname = "tomatto" + toTime + num;

    return autoNickname;
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

  async kakaoToken(token: string) {
    try {
      const kakaoRes = await axios({
        method: "GET",
        url: "https://kapi.kakao.com/v2/user/me",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = kakaoRes.data;
      const kakaoId = data.id;
      const kakaoEmail = data.kakao_account?.email;

      return {
        result: "SUCCESS",
        data: data,
        socialId: kakaoId,
        socialEmail: kakaoEmail,
      };
    } catch (e) {
      console.log(e);
      return {
        result: "FAIL",
      };
    }
  }

  async naverToken(token: string) {
    try {
      const naverRes = await axios({
        method: "GET",
        url: "https://openapi.naver.com/v1/nid/me",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = naverRes.data;
      console.log("naver token data ", data);
      const naverId = data.response.id;
      const naverEmail = data.response.email;

      return {
        result: "SUCCESS",
        data: data,
        socialId: naverId,
        socialEmail: naverEmail,
      };
    } catch (e) {
      console.log(e);
      return {
        result: "FAIL",
      };
    }
  }

  createToken(user: UserJwt) {
    return jwt.sign(user, process.env.JWT_SECRET_KEY, { expiresIn: "365d" });
  }

  async getUserByOauth(socialId: string, platformType: string) {
    return await this.userRepository.findOne({
      socialId: socialId,
      platformType: platformType,
    });
  }

  async findAll() {
    const Users = await this.userRepository.find({});

    return Users;
  }

  async findOne(userId: string) {
    const user = this.userRepository.findOne({
      where: {
        id: userId,
      },
      relations: ["profile", "balanceGames", "balanceGameSelectionVotes"],
    });

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
