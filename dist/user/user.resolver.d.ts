import { User } from "./user.model";
import { UserService } from "./user.service";
import { CreateUserInput } from "./dto/create-user.input";
import { LoginUserInput } from "./dto/login-user.input";
import { SetProfileInput } from "./dto/set-profile.input";
import { UserJwt } from "./dto/user-jwt";
import { BalanceGameService } from "../balance-game/balance-game.service";
import { UserProfile } from "../user-profile/user-profile.model";
import { UserProfileService } from "../user-profile/user-profile.service";
export declare class UserResolver {
    private readonly userService;
    private readonly userProfileService;
    private readonly balanceGameService;
    constructor(userService: UserService, userProfileService: UserProfileService, balanceGameService: BalanceGameService);
    createUser(createUserInput: CreateUserInput): Promise<User>;
    login(loginUserInput: LoginUserInput): Promise<{
        jwt: string;
        email: any;
        status: string;
    }>;
    setProfile(setProfileInput: SetProfileInput, token: UserJwt): Promise<UserProfile>;
    myPage(token: UserJwt): Promise<User>;
    findAll(): Promise<User[]>;
}
