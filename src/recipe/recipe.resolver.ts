import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { NewRecipeInput } from './dtos/new-recipe.input';
import { UpdateRecipeInput } from './dtos/update-recipe.input';
import { RecipesArgs } from './dtos/recipes.args';
import { Recipe } from './recipe.model';
import { RecipesService } from './recipe.service';

const pubSub = new PubSub();

@Resolver(of => Recipe)
export class RecipesResolver {
  constructor(private readonly recipesService: RecipesService) {}
  

  /**
   * Query example
   *   {
        recipes {
          id
          title
    }
  }
   */
  @Query(returns => [Recipe])
  async recipes(): Promise<Recipe[]> {
    const recipes = await this.recipesService.findAllFromORM();
    return recipes;
  }
  
  
  /**
   * Query Example
mutation {
   create(newRecipeData: {id: "1234", title:"dddd", description:"ddee"}) {
    id
  }
}
   * 
   * 
   * 
   */
  @Mutation(returns => Recipe)
  async create(
    @Args('newRecipeData') newRecipeData: NewRecipeInput,
  ): Promise<Recipe> {
    const recipe = await this.recipesService.create(newRecipeData);
    
    return recipe;
  }

}