import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';


export const Token = createParamDecorator((data, context: ExecutionContext): ParameterDecorator => {
  const ctx = GqlExecutionContext.create(context).getContext().req;
  // console.log(ctx);

  return ctx.user;
});