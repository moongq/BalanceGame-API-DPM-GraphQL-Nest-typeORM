import { Repository } from "typeorm";
import { User } from "./user.model";
import { CreateUserInput } from "./dto/create-user.input";
import { UserJwt } from "./dto/user-jwt";
import { UserProfileService } from "../user-profile/user-profile.service";
export declare class UserService {
    private userRepository;
    private userProfileService;
    constructor(userRepository: Repository<User>, userProfileService: UserProfileService);
    create(data: CreateUserInput): Promise<User>;
    oauthCreateUser(data: CreateUserInput): Promise<User>;
    kakaoToken(token: string): Promise<{
        result: string;
        data: any;
        socialId: any;
        socialEmail: any;
    } | {
        result: string;
        data?: undefined;
        socialId?: undefined;
        socialEmail?: undefined;
    }>;
    naverToken(token: string): Promise<{
        result: string;
        data: any;
        socialId: any;
        socialEmail: any;
    } | {
        result: string;
        data?: undefined;
        socialId?: undefined;
        socialEmail?: undefined;
    }>;
    createToken(user: UserJwt): string;
    getUserByOauth(socialId: string, platformType: string): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(userId: string): Promise<User>;
}
