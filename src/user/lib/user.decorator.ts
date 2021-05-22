import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

export const Token = createParamDecorator(
  (_, context: ExecutionContext): ParameterDecorator => {
    const ctx = GqlExecutionContext.create(context).getContext().req;
    console.log(ctx.user);

    return ctx.user;
  }
);
