import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { RecipesModule } from './recipe/recipe.module';
import { DatabaseModule } from './loaders/database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    RecipesModule,
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    DatabaseModule,
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
    })
  ],
  providers: [],
})
export class AppModule {}
