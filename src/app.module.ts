import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { RecipesModule } from './recipe/recipe.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { UserProfileModule } from './user-profile/user-profile.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV === 'dev' ? 'config/.dev.env' : 'config/.prod.env'
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [
          __dirname + '/**/*.model{.ts,.js}',
      ],
      synchronize: true,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    RecipesModule,
    UserModule,
    UserProfileModule,
  ],
  providers: [],
})

export class AppModule {}
