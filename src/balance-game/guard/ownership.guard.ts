import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus, Inject } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import * as jwt from "jsonwebtoken";
import { BalanceGameService } from "../balance-game.service";

@Injectable()
export class OnwershipGuard implements CanActivate {
  constructor(@Inject("BalanceGameService") private readonly balanceGameService: BalanceGameService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 1. 내 아이디 가져오기.
    const ctx = GqlExecutionContext.create(context).getContext().req;
    // console.log(ctx.headers);
    // if (!ctx.headers.authorization) {
    //   return false;
    // }
    // ctx.user = await this.validateToken(ctx.headers.authorization);

    // 2. 밸런스 게임의 작성자 id가져오기.
    const balanceGameId: string = context["args"][1].id;

    const balanceGameData = await this.balanceGameService.findOne(balanceGameId);

    console.log("=====");
    console.log(balanceGameData.userId);

    // 3. 비교하기.
    if (ctx.user.id == balanceGameData.userId) {
      return true;
    }
    return false;
  }

  async validateToken(auth: string) {
    if (auth.split(" ")[0] !== "Bearer") {
      throw new HttpException("Invaild token", HttpStatus.UNAUTHORIZED);
    }

    const token = auth.split(" ")[1];
    try {
      return await jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (e) {
      throw new HttpException("Invaild token", HttpStatus.UNAUTHORIZED);
    }
  }
}
