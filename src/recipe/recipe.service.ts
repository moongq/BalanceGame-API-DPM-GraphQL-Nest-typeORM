import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Recipe } from "./recipe.model";

import { NewRecipeInput } from "./dtos/new-recipe.input";

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipe)
    private recipeRepository: Repository<Recipe>
  ) {}

  async findAllFromORM(): Promise<Recipe[]> {
    return await this.recipeRepository.find({});
  }

  async create(data: NewRecipeInput): Promise<Recipe> {
    const newRecipe = this.recipeRepository.create(data);

    return this.recipeRepository.save(newRecipe);
  }
}
