import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UserProfile } from "./user-profile.model";
import { UserProfileResolver } from "./user-profile.resolver";
import { UserProfileService } from "./user-profile.service";

@Module({
  imports: [TypeOrmModule.forFeature([UserProfile])],
  providers: [UserProfileResolver, UserProfileService],
  exports: [UserProfileService],
})
export class UserProfileModule {}
