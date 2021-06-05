import { CreateUserProfileInput } from "../../user-profile/dto/create-user-profile.input";
export declare class CreateUserInput {
    socialId: string;
    platformType?: string;
    profile: CreateUserProfileInput;
}
