import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { NewRecipeInput } from './dto/new-recipe.input';
import { UpdateRecipeInput } from './dto/update-recipe.input';
import { RecipesArgs } from './dto/recipes.args';
import { Recipe } from './models/recipe.model';
import { RecipesService } from './recipes.service';

const pubSub = new PubSub();

@Resolver(of => Recipe)
export class RecipesResolver {
  constructor(private readonly recipesService: RecipesService) {}
  
  @Query(returns => [Recipe])
  async recipes(): Promise<Recipe[]> {
    const recipes = await this.recipesService.findAllFromORM();
    return recipes;
  }
  
  
  @Mutation(returns => Recipe)
  async create(
    @Args('newRecipeData') newRecipeData: NewRecipeInput,
  ): Promise<Recipe> {
    const recipe = await this.recipesService.create(newRecipeData);
    
    return recipe;
  }

  @Query(ruturns => String)
  sayHello(): String {
    const a = 'Hellodddddddd';
    return a;
  }

  @Query(returns => Recipe)
  async recipe(@Args('id') id: string): Promise<Recipe> {
    const recipe = await this.recipesService.findOneById(id);
    if (!recipe) {
      throw new NotFoundException(id);
    }
    return recipe;
  }



  @Mutation(returns => [Recipe])
  async updateRecipe(
    @Args('updateRecipeData') updateRecipeData: UpdateRecipeInput,
  ): Promise<Recipe[]> {
    const recipe = await this.recipesService.updateRecipe(updateRecipeData);

    return recipe;
  }

//   @Mutation(returns => Boolean)
//   async removeRecipe(@Args('id') id: string) {
//     return this.recipesService.remove(id);
//   }

//   @Subscription(returns => Recipe)
//   recipeAdded() {
//     return pubSub.asyncIterator('recipeAdded');
//   }
}