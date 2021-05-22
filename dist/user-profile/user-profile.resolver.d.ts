import { UserProfile } from "./user-profile.model";
import { UserProfileService } from "./user-profile.service";
import { CreateUserProfileInput } from "./dto/create-user-profile.input";
export declare class UserProfileResolver {
    private readonly userProfileService;
    constructor(userProfileService: UserProfileService);
    createUserProfile(createUserProfileInput: CreateUserProfileInput): Promise<UserProfile>;
}
