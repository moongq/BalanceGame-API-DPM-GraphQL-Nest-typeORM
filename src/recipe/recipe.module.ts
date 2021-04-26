import { Module } from '@nestjs/common';
import { RecipesResolver } from './recipe.resolver';
import { RecipesService } from './recipe.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe } from './recipe.model';

@Module({
  imports: [TypeOrmModule.forFeature([Recipe])],
  providers: [
    RecipesResolver, 
    RecipesService
  ],
})
export class RecipesModule {}
