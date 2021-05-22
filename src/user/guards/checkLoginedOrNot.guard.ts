import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import * as jwt from "jsonwebtoken";

@Injectable()
export class CheckLoginOrNot implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context).getContext().req;
    // console.log(ctx.headers);
    if (!ctx.headers.authorization) {
      console.log(ctx.headers.authorization);
      ctx.user = "notLogined";
      return true;
    }
    ctx.user = await this.validateToken(ctx.headers.authorization);

    return true;
  }

  async validateToken(auth: string) {
    if (auth.split(" ")[0] !== "Bearer") {
      throw new HttpException("Invalid token", HttpStatus.UNAUTHORIZED);
    }

    const token = auth.split(" ")[1];
    try {
      return jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (e) {
      throw new HttpException("Invalid token", HttpStatus.UNAUTHORIZED);
    }
  }
}
