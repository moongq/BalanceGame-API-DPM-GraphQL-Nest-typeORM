import { Injectable, Inject } from '@nestjs/common';
import { NewRecipeInput } from './dto/new-recipe.input';
import { RecipesArgs } from './dto/recipes.args';
import { Recipe } from './models/recipe.model';
import { RECIPES } from '../mocks/recipes.mock';
import { UpdateRecipeInput } from './dto/update-recipe.input';
import { Repository } from 'typeorm';

@Injectable()
export class RecipesService {

  constructor(
    @Inject('RECIPE_REPOSITORY')
    private recipeRepository: Repository<Recipe>,
  ) {}

  async findAllFromORM(): Promise<Recipe[]> {
    return await this.recipeRepository.find({
    });
  }
//   recipes = RECIPES;

  async create(data: NewRecipeInput): Promise<Recipe> {
    const newRecipe = this.recipeRepository.create(data);
    this.recipeRepository.save(newRecipe);
    console.log(this.recipeRepository)
    console.log(newRecipe)
    return newRecipe;
  }

  recipes = [
    { id: '1', title: 'Recipe #1', description: "This is the description for the Recipe #1",  },
    { id: '2', title: 'Recipe #2', description: "This is the description for the Recipe #2",  },
    { id: '3', title: 'Recipe #3', description: "This is the description for the Recipe #3",  },
    { id: '4', title: 'Recipe #4', description: "This is the description for the Recipe #4",  },
    { id: '5', title: 'Recipe #5', description: "This is the description for the Recipe #5",  },
    { id: '6', title: 'Recipe #6', description: "This is the description for the Recipe #6",  },
    { id: '7', title: 'Recipe #7', description: "This is the description for the Recipe #7",  },
  ];

  // create(data: NewRecipeInput): {id: string, title: string, description: string} {
  //   return {} as any;
  // }




  async findOneById(id: string): Promise<Recipe> {
    const recipe = this.recipes.find(recipe => recipe.id === id);
    return recipe;
  }

  findAll(): Recipe[] {
    return this.recipes;
  }

  async addRecipe(input: NewRecipeInput): Promise<Recipe> {
    const newRecipe = {
        id: input.id,
        title: input.title,
        description: input.description
    }

    const a = this.recipes.push(newRecipe)
    console.log(this.recipes)
    return this.recipes[this.recipes.length -1];
  }

  async updateRecipe(input: UpdateRecipeInput): Promise<Recipe[]> {
    const updateRecipeData: UpdateRecipeInput = {
      ...input
    };

    const updatingIndex = this.recipes.findIndex(recipe => updateRecipeData.id == recipe.id);
    this.recipes[updatingIndex] = updateRecipeData;

    return this.recipes;
  }

  async remove(id: string): Promise<boolean> {
    return true;
  }

}