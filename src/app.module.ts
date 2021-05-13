import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppService } from "./app.service";
import { GraphQLModule } from "@nestjs/graphql";
import { RecipesModule } from "./recipe/recipe.module";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "./user/user.module";
import { UserProfileModule } from "./user-profile/user-profile.module";
import { BalanceGameModule } from "./balance-game/balance-game.module";
import { BalanceGameSelectionModule } from "./balance-game-selection/balance-game-selection.module";
import { BalanceGameSelectionVoteModule } from "./balance-game-selection-vote/balance-game-selection-vote.module";
import { BalanceGameThumbModule } from "./balance-game-thumb/balance-game-thumb.module";
import { BalanceGameKeywordModule } from "./balance-game-keyword/balance-game-keyword.module";
import { CommentModule } from "./comment/comment.module";
import { ReplyModule } from "./reply/reply.module";
import { NotificationModule } from "./notification/notification.module";
import { FileModule } from './file/file.module';
import { graphqlUploadExpress } from "graphql-upload";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV === "development" ? "config/.dev.env" : "config/.prod.env",
    }),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + "/**/*.model{.ts,.js}"],
      synchronize: true,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      context: ({req}) => {
        headers: req.headers; 
      },
      path: '/graphql', // 뭔지모름 그냥 따라하는 중
      uploads: false, // 뭔지모름 그냥 따라하는 중
    }),
    RecipesModule,
    UserModule,
    UserProfileModule,
    BalanceGameModule,
    BalanceGameSelectionModule,
    BalanceGameSelectionVoteModule,
    BalanceGameThumbModule,
    BalanceGameKeywordModule,
    CommentModule,
    ReplyModule,
    NotificationModule,
    FileModule,
  ],
  providers: [],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(graphqlUploadExpress()).forRoutes('graphql')
  }
}
