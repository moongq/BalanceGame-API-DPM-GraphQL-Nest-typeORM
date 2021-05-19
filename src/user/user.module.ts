import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { User } from "./user.model";
import { UserResolver } from "./user.resolver";
import { UserService } from "./user.service";

import { BalanceGameModule } from "../balance-game/balance-game.module";
import { UserProfileModule } from "../user-profile/user-profile.module";

@Module({
  imports: [TypeOrmModule.forFeature([User]), UserProfileModule, BalanceGameModule],
  providers: [UserResolver, UserService],
})
export class UserModule {}
