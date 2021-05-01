import { Module } from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { UserProfileResolver } from './user-profile.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProfile } from './user-profile.model';

@Module({
  imports: [TypeOrmModule.forFeature([UserProfile])],
  providers: [UserProfileResolver, UserProfileService],
  exports: [UserProfileService],
})
export class UserProfileModule {}
