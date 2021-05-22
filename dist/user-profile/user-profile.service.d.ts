import { Repository } from "typeorm";
import { UserProfile } from "./user-profile.model";
import { CreateUserProfileInput } from "./dto/create-user-profile.input";
export declare class UserProfileService {
    private userProfileRepository;
    constructor(userProfileRepository: Repository<UserProfile>);
    create(createUserProfileInput: CreateUserProfileInput): Promise<UserProfile>;
    findAll(): Promise<UserProfile[]>;
    findOne(id: string): Promise<UserProfile>;
    update(id: string, nickname: string, email: string): Promise<UserProfile>;
}
