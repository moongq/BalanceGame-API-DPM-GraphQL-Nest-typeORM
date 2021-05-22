import { Repository } from "typeorm";
import { Recipe } from "./recipe.model";
import { NewRecipeInput } from "./dtos/new-recipe.input";
export declare class RecipesService {
    private recipeRepository;
    constructor(recipeRepository: Repository<Recipe>);
    findAllFromORM(): Promise<Recipe[]>;
    create(data: NewRecipeInput): Promise<Recipe>;
}
