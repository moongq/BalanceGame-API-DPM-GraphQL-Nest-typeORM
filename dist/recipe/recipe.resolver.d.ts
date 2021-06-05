import { Recipe } from "./recipe.model";
import { RecipesService } from "./recipe.service";
import { NewRecipeInput } from "./dtos/new-recipe.input";
export declare class RecipesResolver {
    private readonly recipesService;
    constructor(recipesService: RecipesService);
    recipes(): Promise<Recipe[]>;
    create(newRecipeData: NewRecipeInput): Promise<Recipe>;
}
