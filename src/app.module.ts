import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { RecipesModule } from './recipe/recipe.module';
import { DatabaseModule } from './loaders/database/database.module';

@Module({
  imports: [
    RecipesModule,
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    DatabaseModule
  ],
  providers: [],
})
export class AppModule {}
