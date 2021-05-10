import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserResolver } from "./user.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.model";
import { UserProfileModule } from "../user-profile/user-profile.module";
import { BalanceGameModule } from "src/balance-game/balance-game.module";

@Module({
  imports: [TypeOrmModule.forFeature([User]), UserProfileModule, BalanceGameModule],
  providers: [UserResolver, UserService],
})
export class UserModule {}
