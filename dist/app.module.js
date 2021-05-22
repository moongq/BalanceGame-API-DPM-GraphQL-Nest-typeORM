"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("@nestjs/typeorm");
const graphql_upload_1 = require("graphql-upload");
const balance_game_keyword_module_1 = require("./balance-game-keyword/balance-game-keyword.module");
const balance_game_module_1 = require("./balance-game/balance-game.module");
const balance_game_selection_module_1 = require("./balance-game-selection/balance-game-selection.module");
const balance_game_selection_vote_module_1 = require("./balance-game-selection-vote/balance-game-selection-vote.module");
const balance_game_thumb_module_1 = require("./balance-game-thumb/balance-game-thumb.module");
const comment_module_1 = require("./comment/comment.module");
const file_module_1 = require("./file/file.module");
const notification_module_1 = require("./notification/notification.module");
const recipe_module_1 = require("./recipe/recipe.module");
const reply_module_1 = require("./reply/reply.module");
const user_module_1 = require("./user/user.module");
const user_profile_module_1 = require("./user-profile/user-profile.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(graphql_upload_1.graphqlUploadExpress()).forRoutes("graphql");
    }
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: process.env.NODE_ENV === "development" ? "config/.dev.env" : "config/.prod.env",
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: "mysql",
                host: process.env.DB_HOST,
                port: 3306,
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                entities: [__dirname + "/**/*.model{.ts,.js}"],
                synchronize: true,
            }),
            graphql_1.GraphQLModule.forRoot({
                autoSchemaFile: true,
                context: ({ req }) => {
                    headers: req.headers;
                },
                path: "/graphql",
                uploads: false,
            }),
            recipe_module_1.RecipesModule,
            user_module_1.UserModule,
            user_profile_module_1.UserProfileModule,
            balance_game_module_1.BalanceGameModule,
            balance_game_selection_module_1.BalanceGameSelectionModule,
            balance_game_selection_vote_module_1.BalanceGameSelectionVoteModule,
            balance_game_thumb_module_1.BalanceGameThumbModule,
            balance_game_keyword_module_1.BalanceGameKeywordModule,
            comment_module_1.CommentModule,
            reply_module_1.ReplyModule,
            notification_module_1.NotificationModule,
            file_module_1.FileModule,
        ],
        providers: [],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map