import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import * as jwt from 'jsonwebtoken';
import { BalanceGameService } from "../balance-game.service";

@Injectable()
export class OnwershipGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    console.log(context["args"][1].id)
    // const ctx = GqlExecutionContext.create(context).getContext().req;

    
    return true;
  }
  
}