import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.model';
import { UserProfileModule } from 'src/user-profile/user-profile.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), UserProfileModule],
  providers: [UserResolver, UserService],
})
export class UserModule {}
