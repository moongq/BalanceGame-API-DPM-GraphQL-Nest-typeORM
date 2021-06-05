"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
exports.Token = common_1.createParamDecorator((_, context) => {
    const ctx = graphql_1.GqlExecutionContext.create(context).getContext().req;
    console.log(ctx.user);
    return ctx.user;
});
//# sourceMappingURL=user.decorator.js.map