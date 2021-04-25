import { Module } from '@nestjs/common';
import { RecipesResolver } from './recipe.resolver';

import { DatabaseModule } from '../loaders/database/database.module';
import { recipeProviders } from './recipe.providers';
import { RecipesService } from './recipe.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...recipeProviders,
    RecipesResolver, 
    RecipesService
  ],
})
export class RecipesModule {}
