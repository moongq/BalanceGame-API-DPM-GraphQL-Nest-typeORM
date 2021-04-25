import { Connection, Repository } from 'typeorm';
import { Recipe } from './recipe.model';

export const recipeProviders = [
  {
    provide: 'RECIPE_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Recipe),
    inject: ['DATABASE_CONNECTION'],
  },
];