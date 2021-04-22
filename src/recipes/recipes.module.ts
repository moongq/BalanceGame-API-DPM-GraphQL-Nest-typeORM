import { Module } from '@nestjs/common';
import { RecipesResolver } from './recipes.resolver';

import { DatabaseModule } from '../database/database.module';
import { recipeProviders } from './recipe.providers';
import { RecipesService } from './recipes.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...recipeProviders,
    RecipesResolver, 
    RecipesService
  ],
})
export class RecipesModule {}
