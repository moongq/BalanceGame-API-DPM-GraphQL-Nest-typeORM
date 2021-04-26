import { Injectable, Inject } from '@nestjs/common';
import { NewRecipeInput } from './dtos/new-recipe.input';
import { RecipesArgs } from './dtos/recipes.args';
import { Recipe } from './recipe.model';
import { RECIPES } from '../mocks/recipes.mock';
import { UpdateRecipeInput } from './dtos/update-recipe.input';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RecipesService {

  constructor(
    @InjectRepository(Recipe)
    private recipeRepository: Repository<Recipe>,
  ) {}

  async findAllFromORM(): Promise<Recipe[]> {
    return await this.recipeRepository.find({
    });
  }

  async create(data: NewRecipeInput): Promise<Recipe> {
    const newRecipe = this.recipeRepository.create(data);
    this.recipeRepository.save(newRecipe);
    console.log(this.recipeRepository)
    console.log(newRecipe)
    return newRecipe;
  }

}